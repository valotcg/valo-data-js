// Downloads the public Valo.Data OpenAPI document and regenerates src/generated/schema.ts.
// Usage: npm run regenerate            (downloads from production)
//        npm run regenerate -- --local (regenerates from the committed openapi.json)
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import openapiTS, { NUMBER, STRING, astToString, tsIntersection, tsLiteral, tsUnion } from "openapi-typescript";
import ts from "typescript";

const OPENAPI_URL = process.env.VALO_DATA_OPENAPI_URL ?? "https://api.valotcg.com/data/v1/openapi.json";
const root = new URL("../", import.meta.url);
const specPath = fileURLToPath(new URL("openapi.json", root));
const schemaPath = fileURLToPath(new URL("src/generated/schema.ts", root));

let spec;
if (process.argv.includes("--local")) {
  spec = JSON.parse(await readFile(specPath, "utf8"));
} else {
  const response = await fetch(OPENAPI_URL, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`GET ${OPENAPI_URL} failed: ${response.status}`);
  spec = await response.json();
  await writeFile(specPath, `${JSON.stringify(spec, null, 2)}\n`);
  console.log(`openapi.json saved (version ${spec.info?.version})`);
}

/** Names of the component schemas reachable from a response body, following `$ref` transitively. */
function responseSchemas(document) {
  const schemas = document.components?.schemas ?? {};
  const seen = new Set();
  const visit = (node) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (node === null || typeof node !== "object") return;
    const ref = typeof node.$ref === "string" ? node.$ref.match(/^#\/components\/schemas\/(.+)$/) : null;
    if (ref && !seen.has(ref[1])) {
      seen.add(ref[1]);
      visit(schemas[ref[1]]);
    }
    Object.values(node).forEach(visit);
  };
  for (const item of Object.values(document.paths ?? {})) {
    for (const operation of Object.values(item)) visit(operation?.responses);
  }
  return seen;
}

const widened = responseSchemas(spec);

/**
 * Forward compatibility: an enum of a response schema becomes `"a" | "b" | (string & {})`
 * (or `(number & {})`), so a value added by the API later still typechecks. The SDK never
 * validates enums at runtime. Request parameters and request-only bodies stay strict.
 */
const NULL_TYPE = ts.factory.createLiteralTypeNode(ts.factory.createNull());

/** `"a" | "b" | (string & {})` for an enum schema, an array of it, or an `anyOf` of those and `null`. */
function openEnum(schema) {
  if (schema === null || typeof schema !== "object") return undefined;
  if (schema.type === "null") return NULL_TYPE;
  const values = schema.enum ?? ("const" in schema ? [schema.const] : null);
  if (Array.isArray(values) && values.length > 0) {
    const literals = values.filter((value) => value !== null);
    const numeric = literals.every((value) => typeof value === "number");
    if (!numeric && !literals.every((value) => typeof value === "string")) return undefined;
    const open = tsIntersection([numeric ? NUMBER : STRING, ts.factory.createTypeLiteralNode([])]);
    const members = [...literals.map((value) => tsLiteral(value)), ts.factory.createParenthesizedType(open)];
    if (values.includes(null)) members.push(NULL_TYPE);
    return tsUnion(members);
  }
  if (schema.type === "array" && schema.items) {
    const item = openEnum(schema.items);
    return item && item !== NULL_TYPE ? ts.factory.createArrayTypeNode(ts.factory.createParenthesizedType(item)) : undefined;
  }
  if (Array.isArray(schema.anyOf)) {
    const members = schema.anyOf.map(openEnum);
    if (members.some((member) => member === undefined) || members.every((member) => member === NULL_TYPE)) return undefined;
    return tsUnion(members);
  }
  return undefined;
}

/**
 * Forward compatibility: enums of response schemas become `"a" | "b" | (string & {})`
 * (or `(number & {})`), so a value added by the API later still typechecks. The SDK never
 * validates enums at runtime. Request parameters and request-only bodies stay strict.
 */
function widenResponseEnums(schemaObject, options) {
  const match = String(options.path ?? "").match(/^#\/components\/schemas\/([^/]+)/);
  if (!match || !widened.has(match[1])) return undefined;
  return openEnum(schemaObject);
}

const ast = await openapiTS(spec, { exportType: true, transform: widenResponseEnums });
const header = [
  "/**",
  ` * Generated from the Valo.Data OpenAPI document, version ${spec.info?.version}.`,
  " * Do not edit by hand: run `npm run regenerate`.",
  " */",
  "",
].join("\n");
await writeFile(schemaPath, header + astToString(ast));
console.log(`src/generated/schema.ts written`);
