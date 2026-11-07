import type { ResponseMeta } from "./types.js";

/** Codes of a 429 that clear on their own within seconds: per-minute throughput and per-key concurrency. */
const RETRYABLE_CODES = new Set(["rate_limited", "concurrency_limited"]);

export interface ValoDataErrorInit {
  status: number | null;
  code: string;
  message: string;
  requestId?: string | null;
  docsUrl?: string | null;
  body?: unknown;
  headers?: Headers;
  cause?: unknown;
}

/**
 * Base class of every error thrown by the SDK.
 * `code` is the stable snake_case code of the API (`card_not_found`, `quota_exceeded`...),
 * or `connection_error` / `invalid_response` / `missing_api_key` for client-side failures.
 */
export class ValoDataError extends Error {
  readonly status: number | null;
  readonly code: string;
  readonly requestId: string | null;
  readonly docsUrl: string | null;
  /** Full parsed error body, with any extra fields the API sends (`resets_at`, `credits_remaining`...). */
  readonly body: unknown;
  readonly headers: Headers | undefined;

  constructor(init: ValoDataErrorInit) {
    super(init.message, init.cause === undefined ? undefined : { cause: init.cause });
    this.name = new.target.name;
    this.status = init.status;
    this.code = init.code;
    this.requestId = init.requestId ?? null;
    this.docsUrl = init.docsUrl ?? null;
    this.body = init.body;
    this.headers = init.headers;
  }
}

/** 401: missing, invalid or expired API key. */
export class AuthenticationError extends ValoDataError {}

/** 403: scope, plan, subscription or IP restriction. */
export class PermissionDeniedError extends ValoDataError {}

/** 404: unknown game, card, sealed product or edition. */
export class NotFoundError extends ValoDataError {}

/** 400 or 422: invalid parameter, cursor or date range. */
export class ValidationError extends ValoDataError {}

/** 429: throughput limit, quota, daily or catalog limit. */
export class RateLimitError extends ValoDataError {
  /** Seconds to wait from the `Retry-After` header, `null` when absent. */
  readonly retryAfter: number | null;
  /** ISO 8601 time the limit lifts (`resets_at` of the body, else `X-RateLimit-Reset`), `null` when unknown. */
  readonly resetsAt: string | null;

  constructor(init: ValoDataErrorInit & { retryAfter: number | null; resetsAt: string | null }) {
    super(init);
    this.retryAfter = init.retryAfter;
    this.resetsAt = init.resetsAt;
  }

  /** `true` for `rate_limited` and `concurrency_limited`: quotas and daily or catalog limits do not clear by retrying. */
  get retryable(): boolean {
    return RETRYABLE_CODES.has(this.code);
  }
}

/** 5xx: server side failure, including `quota_unavailable`. */
export class ServerError extends ValoDataError {}

function parseRetryAfter(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds);
  const date = Date.parse(value);
  return Number.isNaN(date) ? null : Math.max(0, (date - Date.now()) / 1000);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Builds the typed error of a non-2xx response. */
export function errorFromResponse(status: number, headers: Headers, body: unknown, meta: ResponseMeta): ValoDataError {
  const detail = isRecord(body) && isRecord(body.error) ? body.error : {};
  const init: ValoDataErrorInit = {
    status,
    code: typeof detail.code === "string" ? detail.code : `http_${status}`,
    message: typeof detail.message === "string" ? detail.message : `HTTP ${status}`,
    requestId: typeof detail.request_id === "string" ? detail.request_id : meta.requestId,
    docsUrl: typeof detail.docs_url === "string" ? detail.docs_url : null,
    body,
    headers,
  };
  if (status === 401) return new AuthenticationError(init);
  if (status === 403) return new PermissionDeniedError(init);
  if (status === 404) return new NotFoundError(init);
  if (status === 400 || status === 422) return new ValidationError(init);
  if (status === 429) {
    let resetsAt = typeof detail.resets_at === "string" ? detail.resets_at : null;
    if (resetsAt === null && meta.rateLimit !== null && init.code === "rate_limited") {
      resetsAt = new Date(meta.rateLimit.reset * 1000).toISOString();
    }
    return new RateLimitError({ ...init, retryAfter: parseRetryAfter(headers.get("retry-after")), resetsAt });
  }
  if (status >= 500) return new ServerError(init);
  return new ValoDataError(init);
}
