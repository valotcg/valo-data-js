import { Transport, type FetchLike } from "./core.js";
import { ValoDataError } from "./errors.js";
import { Analysis, Cards, Editions, Games, Sealed } from "./resources.js";
import type { ApiResponse, RequestOptions, UsageParams, UsageResponse } from "./types.js";

export const DEFAULT_BASE_URL = "https://api.valotcg.com";

export interface ValoDataOptions {
  /** API key (`vd_live_...` or `vd_test_...`). Defaults to `process.env.VALO_DATA_API_KEY` on servers. */
  apiKey?: string;
  /** Defaults to `https://api.valotcg.com`. */
  baseUrl?: string;
  /** Automatic retries of a `429 rate_limited` or `concurrency_limited` after `Retry-After`. `0` disables them. Defaults to 2. */
  maxRetries?: number;
  /** Custom `fetch` implementation. Defaults to the global `fetch`. */
  fetch?: FetchLike;
}

function envApiKey(): string | undefined {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.VALO_DATA_API_KEY || undefined;
}

/** Client of the Valo.Data API. Every method resolves to `{ data, meta }`. */
export class ValoData {
  readonly games: Games;
  readonly editions: Editions;
  readonly cards: Cards;
  readonly sealed: Sealed;
  readonly analysis: Analysis;
  readonly baseUrl: string;
  private readonly transport: Transport;

  constructor(options: ValoDataOptions = {}) {
    const apiKey = options.apiKey ?? envApiKey();
    if (!apiKey) {
      throw new ValoDataError({
        status: null,
        code: "missing_api_key",
        message:
          "No API key: pass { apiKey } or set VALO_DATA_API_KEY. Create a free Sandbox key at https://valotcg.com/developers/account",
      });
    }
    const maxRetries = options.maxRetries ?? 2;
    if (!Number.isInteger(maxRetries) || maxRetries < 0) {
      throw new ValoDataError({ status: null, code: "invalid_option", message: "maxRetries must be an integer >= 0" });
    }
    const fetchImpl = options.fetch ?? (globalThis.fetch as FetchLike | undefined);
    if (typeof fetchImpl !== "function") {
      throw new ValoDataError({
        status: null,
        code: "invalid_option",
        message: "No global fetch: use Node 18+ or pass { fetch }",
      });
    }
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.transport = new Transport({
      apiKey,
      baseUrl: this.baseUrl,
      maxRetries,
      // Bound to globalThis: browsers throw "Illegal invocation" on a detached fetch.
      fetch: options.fetch ?? ((input, init) => fetchImpl.call(globalThis, input, init)),
    });
    this.games = new Games(this.transport);
    this.editions = new Editions(this.transport);
    this.cards = new Cards(this.transport);
    this.sealed = new Sealed(this.transport);
    this.analysis = new Analysis(this.transport);
  }

  /** Consumption of the current window: `GET /developer/v1/usage` (0 credit). */
  usage(params: UsageParams = {}, options?: RequestOptions): Promise<ApiResponse<UsageResponse>> {
    return this.transport.request({ method: "GET", path: "/developer/v1/usage", query: params, ...options });
  }
}
