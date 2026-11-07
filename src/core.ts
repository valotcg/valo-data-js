import { RateLimitError, ValoDataError, errorFromResponse } from "./errors.js";
import type { ApiResponse, RequestOptions, ResponseMeta } from "./types.js";
import { VERSION } from "./version.js";

export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

export type QueryValue = string | number | boolean | null | undefined | readonly (string | number)[];

export interface RequestSpec extends RequestOptions {
  method: "GET" | "POST";
  path: string;
  query?: object;
  body?: unknown;
}

export interface TransportConfig {
  apiKey: string;
  baseUrl: string;
  maxRetries: number;
  fetch: FetchLike;
}

function toNumber(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseMeta(headers: Headers): ResponseMeta {
  const limit = toNumber(headers.get("x-ratelimit-limit"));
  const remaining = toNumber(headers.get("x-ratelimit-remaining"));
  const reset = toNumber(headers.get("x-ratelimit-reset"));
  return {
    creditsUsed: toNumber(headers.get("x-credits-used")),
    creditsRemaining: toNumber(headers.get("x-credits-remaining")),
    requestId: headers.get("x-request-id"),
    rateLimit: limit !== null && remaining !== null && reset !== null ? { limit, remaining, reset } : null,
  };
}

/** Serializes query parameters: `null`/`undefined` are dropped, arrays are joined with commas. */
export function buildQuery(query: object | undefined): string {
  if (query === undefined) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(query as Record<string, QueryValue>)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length > 0) search.append(key, value.join(","));
    } else {
      search.append(key, String(value));
    }
  }
  const encoded = search.toString();
  return encoded === "" ? "" : `?${encoded}`;
}

/** Encodes one path segment. */
export function segment(value: string | number): string {
  return encodeURIComponent(String(value));
}

function abortError(signal: AbortSignal): unknown {
  return signal.reason ?? new DOMException("The operation was aborted.", "AbortError");
}

function wait(ms: number, signal: AbortSignal | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortError(signal));
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(abortError(signal as AbortSignal));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (text === "") return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

const IS_BROWSER = typeof (globalThis as { document?: unknown }).document !== "undefined";

export class Transport {
  constructor(private readonly config: TransportConfig) {}

  async request<T>(spec: RequestSpec): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${spec.path}${buildQuery(spec.query)}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.config.apiKey}`,
      Accept: "application/json",
    };
    // Browsers manage the User-Agent and would preflight a custom one.
    if (!IS_BROWSER) headers["User-Agent"] = `valotcg-js/${VERSION}`;
    if (spec.body !== undefined) headers["Content-Type"] = "application/json";
    const init: RequestInit = {
      method: spec.method,
      headers,
      body: spec.body === undefined ? undefined : JSON.stringify(spec.body),
      signal: spec.signal,
    };

    for (let attempt = 0; ; attempt++) {
      let response: Response;
      try {
        response = await this.config.fetch(url, init);
      } catch (error) {
        if (spec.signal?.aborted) throw error;
        throw new ValoDataError({
          status: null,
          code: "connection_error",
          message: `Request to ${spec.method} ${spec.path} failed: ${error instanceof Error ? error.message : String(error)}`,
          cause: error,
        });
      }
      const meta = parseMeta(response.headers);
      const body = await readBody(response);
      if (response.ok) {
        if (body === null || typeof body !== "object") {
          throw new ValoDataError({
            status: response.status,
            code: "invalid_response",
            message: `Expected a JSON body from ${spec.method} ${spec.path}`,
            requestId: meta.requestId,
            body,
            headers: response.headers,
          });
        }
        return { data: body as T, meta };
      }
      const error = errorFromResponse(response.status, response.headers, body, meta);
      if (error instanceof RateLimitError && error.retryable && attempt < this.config.maxRetries) {
        await wait((error.retryAfter ?? 1) * 1000, spec.signal);
        continue;
      }
      throw error;
    }
  }
}
