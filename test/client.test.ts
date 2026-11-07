import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AuthenticationError,
  NotFoundError,
  PermissionDeniedError,
  RateLimitError,
  ServerError,
  ValidationError,
  ValoData,
  ValoDataError,
  VERSION,
} from "../src/index.js";
import * as fx from "./fixtures.js";
import { clientWith, mockFetch } from "./mock-fetch.js";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe("configuration", () => {
  it("sends the key as a Bearer token with JSON accept and a User-Agent", async () => {
    const mock = mockFetch(() => ({ body: fx.games }));
    await clientWith(mock, { apiKey: "vd_test_abc" }).games.list();
    const headers = mock.calls[0]!.headers;
    expect(headers.get("authorization")).toBe("Bearer vd_test_abc");
    expect(headers.get("accept")).toBe("application/json");
    expect(headers.get("user-agent")).toBe(`valotcg-js/${VERSION}`);
    expect(headers.get("content-type")).toBeNull();
  });

  it("reads the key from VALO_DATA_API_KEY when apiKey is omitted", async () => {
    vi.stubEnv("VALO_DATA_API_KEY", "vd_test_from_env");
    const mock = mockFetch(() => ({ body: fx.games }));
    await new ValoData({ fetch: mock.fetch }).games.list();
    expect(mock.calls[0]!.headers.get("authorization")).toBe("Bearer vd_test_from_env");
  });

  it("throws missing_api_key without any key", () => {
    vi.stubEnv("VALO_DATA_API_KEY", "");
    expect(() => new ValoData({ fetch: mockFetch().fetch })).toThrowError(
      expect.objectContaining({ code: "missing_api_key" }),
    );
  });

  it("rejects a negative maxRetries", () => {
    expect(() => clientWith(mockFetch(), { maxRetries: -1 })).toThrowError(ValoDataError);
  });

  it("uses https://api.valotcg.com by default and trims a trailing slash of baseUrl", async () => {
    const mock = mockFetch(() => ({ body: fx.games }));
    await clientWith(mock).games.list();
    expect(mock.calls[0]!.url.origin).toBe("https://api.valotcg.com");
    const preprod = mockFetch(() => ({ body: fx.games }));
    await clientWith(preprod, { baseUrl: "https://api.preprod.valotcg.com/" }).games.list();
    expect(preprod.calls[0]!.url.href).toBe("https://api.preprod.valotcg.com/data/v1/games");
  });
});

describe("meta", () => {
  it("exposes credits, request id and rate limit headers", async () => {
    const mock = mockFetch(() => ({
      body: fx.summary,
      headers: {
        "x-credits-used": "2",
        "x-credits-remaining": "498",
        "x-request-id": "req_abc",
        "x-ratelimit-limit": "30",
        "x-ratelimit-remaining": "29",
        "x-ratelimit-reset": "1794000000",
      },
    }));
    const { meta } = await clientWith(mock).analysis.cardSummary(101);
    expect(meta).toEqual({
      creditsUsed: 2,
      creditsRemaining: 498,
      requestId: "req_abc",
      rateLimit: { limit: 30, remaining: 29, reset: 1794000000 },
    });
  });

  it("returns null fields when the headers are absent", async () => {
    const fetch = async () => new Response(JSON.stringify(fx.games), { status: 200 });
    const { meta } = await new ValoData({ apiKey: "vd_test_x", fetch }).games.list();
    expect(meta).toEqual({ creditsUsed: null, creditsRemaining: null, requestId: null, rateLimit: null });
  });
});

describe("errors", () => {
  const cases = [
    [401, "invalid_api_key", AuthenticationError],
    [403, "plan_feature_unavailable", PermissionDeniedError],
    [404, "card_not_found", NotFoundError],
    [422, "invalid_cursor", ValidationError],
    [400, "invalid_request", ValidationError],
    [429, "quota_exceeded", RateLimitError],
    [500, "internal_error", ServerError],
    [503, "quota_unavailable", ServerError],
  ] as const;

  it.each(cases)("HTTP %i %s -> %o", async (status, code, ErrorClass) => {
    const mock = mockFetch(() => ({ status, body: fx.errorBody(code), headers: { "x-request-id": "req_err" } }));
    const error = await clientWith(mock).cards.get(1).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ErrorClass);
    expect(error).toBeInstanceOf(ValoDataError);
    expect(error).toMatchObject({
      status,
      code,
      message: `Error ${code}`,
      requestId: "req_err",
      docsUrl: `https://valotcg.com/developers/docs#error-${code}`,
      name: ErrorClass.name,
    });
  });

  it("keeps extra fields and exposes resetsAt on quota errors", async () => {
    const body = fx.errorBody("quota_exceeded", { resets_at: "2026-12-01T00:00:00+00:00", credits_remaining: 0 });
    const mock = mockFetch(() => ({ status: 429, body }));
    const error = (await clientWith(mock).cards.get(1).catch((e: unknown) => e)) as RateLimitError;
    expect(error.resetsAt).toBe("2026-12-01T00:00:00+00:00");
    expect(error.retryAfter).toBeNull();
    expect(error.retryable).toBe(false);
    expect(error.body).toEqual(body);
  });

  it("maps an unknown status to the base class and a non JSON body to http_<status>", async () => {
    const fetch = async () => new Response("<html>Bad gateway</html>", { status: 502 });
    const error = (await new ValoData({ apiKey: "vd_test_x", fetch }).games.list().catch((e: unknown) => e)) as ServerError;
    expect(error).toBeInstanceOf(ServerError);
    expect(error.code).toBe("http_502");
    expect(error.body).toBe("<html>Bad gateway</html>");

    const teapot = async () => new Response(null, { status: 418 });
    const other = await new ValoData({ apiKey: "vd_test_x", fetch: teapot }).games.list().catch((e: unknown) => e);
    expect(other).toBeInstanceOf(ValoDataError);
    expect(other).not.toBeInstanceOf(ServerError);
  });

  it("wraps network failures as connection_error", async () => {
    const fetch = async () => {
      throw new TypeError("fetch failed");
    };
    const error = (await new ValoData({ apiKey: "vd_test_x", fetch }).games.list().catch((e: unknown) => e)) as ValoDataError;
    expect(error.code).toBe("connection_error");
    expect(error.status).toBeNull();
    expect(error.cause).toBeInstanceOf(TypeError);
  });
});

describe("retry on 429 rate_limited", () => {
  const rateLimited = (retryAfter: string) => ({
    status: 429,
    body: fx.errorBody("rate_limited"),
    headers: { "retry-after": retryAfter, "x-ratelimit-limit": "30", "x-ratelimit-remaining": "0", "x-ratelimit-reset": "1794000000" },
  });

  it("retries after Retry-After and then succeeds", async () => {
    vi.useFakeTimers();
    const mock = mockFetch(() => ({ body: fx.games }));
    mock.queue.push(rateLimited("2"));
    const pending = clientWith(mock).games.list();
    await vi.advanceTimersByTimeAsync(1999);
    expect(mock.calls).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    const { data } = await pending;
    expect(mock.calls).toHaveLength(2);
    expect(data.items).toHaveLength(1);
  });

  it("gives up after maxRetries and throws RateLimitError with retryAfter and resetsAt", async () => {
    const mock = mockFetch(() => rateLimited("0"));
    const error = (await clientWith(mock, { maxRetries: 2 }).games.list().catch((e: unknown) => e)) as RateLimitError;
    expect(mock.calls).toHaveLength(3);
    expect(error).toBeInstanceOf(RateLimitError);
    expect(error.code).toBe("rate_limited");
    expect(error.retryAfter).toBe(0);
    expect(error.retryable).toBe(true);
    expect(error.resetsAt).toBe(new Date(1794000000 * 1000).toISOString());
  });

  it("does not retry with maxRetries: 0", async () => {
    const mock = mockFetch(() => rateLimited("0"));
    await expect(clientWith(mock, { maxRetries: 0 }).games.list()).rejects.toBeInstanceOf(RateLimitError);
    expect(mock.calls).toHaveLength(1);
  });

  it("retries concurrency_limited after Retry-After: 1", async () => {
    vi.useFakeTimers();
    const mock = mockFetch(() => ({ body: fx.games }));
    mock.queue.push({ status: 429, body: fx.errorBody("concurrency_limited"), headers: { "retry-after": "1" } });
    const pending = clientWith(mock).games.list();
    await vi.advanceTimersByTimeAsync(1000);
    await expect(pending).resolves.toMatchObject({ data: fx.games });
    expect(mock.calls).toHaveLength(2);
  });

  it.each(["quota_exceeded", "daily_limit_reached", "catalog_limit_reached", "key_credit_cap_reached"])(
    "never retries %s",
    async (code) => {
      const mock = mockFetch(() => ({ status: 429, body: fx.errorBody(code), headers: { "retry-after": "0" } }));
      await expect(clientWith(mock).games.list()).rejects.toMatchObject({ code });
      expect(mock.calls).toHaveLength(1);
    },
  );

  it("does not retry server errors", async () => {
    const mock = mockFetch(() => ({ status: 503, body: fx.errorBody("quota_unavailable") }));
    await expect(clientWith(mock).games.list()).rejects.toBeInstanceOf(ServerError);
    expect(mock.calls).toHaveLength(1);
  });

  it("aborts a pending retry wait through the signal", async () => {
    const mock = mockFetch(() => rateLimited("30"));
    const controller = new AbortController();
    const pending = clientWith(mock).games.list({ signal: controller.signal });
    await vi.waitFor(() => expect(mock.calls).toHaveLength(1));
    controller.abort(new Error("stop"));
    await expect(pending).rejects.toThrow("stop");
    expect(mock.calls).toHaveLength(1);
  });
});

describe("forward compatibility", () => {
  it("returns unknown enum values and unknown fields unchanged", async () => {
    const body = {
      ...fx.summary,
      reliability: "partially_stale",
      new_block: { score: 3 },
      prices: [{ ...fx.summary.prices[0], source: "new_market", currency: "JPY", extra_field: true }],
      changes: [{ period_days: 365, change_pct: 1.5, source: "new_market" }],
    };
    const mock = mockFetch(() => ({ body }));
    const { data } = await clientWith(mock).analysis.cardSummary(101);
    expect(data).toEqual(body);
    // Widened response enums accept values the API may add later.
    const reliability: typeof data.reliability = "partially_stale";
    const source: (typeof data.prices)[number]["source"] = "new_market";
    const period: (typeof data.changes)[number]["period_days"] = 365;
    expect([reliability, source, period]).toEqual([data.reliability, data.prices[0]?.source, data.changes[0]?.period_days]);
  });
});

describe("pagination", () => {
  it("follows next_cursor through every page", async () => {
    const pages: Record<string, ReturnType<typeof fx.cardPage>> = {
      "": fx.cardPage([fx.card(1), fx.card(2)], "c2"),
      c2: fx.cardPage([fx.card(3)], "c3"),
      c3: fx.cardPage([fx.card(4)], null),
    };
    const mock = mockFetch((call) => ({ body: pages[call.url.searchParams.get("cursor") ?? ""] }));
    const ids: number[] = [];
    for await (const card of clientWith(mock).cards.iterSearch({ game: "pokemon", q: "pikachu", page_size: 2 })) {
      ids.push(card.card_id);
    }
    expect(ids).toEqual([1, 2, 3, 4]);
    expect(mock.calls.map((c) => c.url.searchParams.get("cursor"))).toEqual([null, "c2", "c3"]);
    for (const call of mock.calls) {
      expect(call.url.searchParams.get("q")).toBe("pikachu");
      expect(call.url.searchParams.get("page_size")).toBe("2");
    }
  });

  it("stops fetching when the loop breaks", async () => {
    const mock = mockFetch(() => ({ body: fx.cardPage([fx.card(1), fx.card(2)], "next") }));
    for await (const card of clientWith(mock).cards.iterSearch({ game: "pokemon" })) {
      if (card.card_id === 2) break;
    }
    expect(mock.calls).toHaveLength(1);
  });

  it("starts from a given cursor and iterates sealed products and editions", async () => {
    const mock = mockFetch((call) =>
      call.url.pathname === "/data/v1/sealed"
        ? { body: fx.sealedPage([fx.sealedProduct(7)], null) }
        : { body: fx.editionPage },
    );
    const client = clientWith(mock);
    const sealed = [];
    for await (const item of client.sealed.iterSearch({ game: "pokemon", cursor: "start" })) sealed.push(item.sealed_id);
    const editions = [];
    for await (const item of client.editions.iterList({ game: "pokemon" })) editions.push(item.edition_id);
    expect(sealed).toEqual([7]);
    expect(editions).toEqual([12]);
    expect(mock.calls[0]!.url.searchParams.get("cursor")).toBe("start");
  });

  it("propagates errors raised on a later page", async () => {
    const mock = mockFetch(() => ({ status: 422, body: fx.errorBody("invalid_cursor") }));
    mock.queue.push({ body: fx.cardPage([fx.card(1)], "bad") });
    const seen: number[] = [];
    const run = async () => {
      for await (const card of clientWith(mock).cards.iterSearch({ game: "pokemon" })) seen.push(card.card_id);
    };
    await expect(run()).rejects.toBeInstanceOf(ValidationError);
    expect(seen).toEqual([1]);
  });
});
