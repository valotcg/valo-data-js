import { ValoData, type ValoDataOptions } from "../src/index.js";

export interface RecordedCall {
  method: string;
  url: URL;
  headers: Headers;
  body: unknown;
}

export interface MockReply {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}

type Handler = (call: RecordedCall) => MockReply;

/** A `fetch` double: replies come from a queue, or from a handler when the queue is empty. */
export function mockFetch(handler: Handler = () => ({ body: {} })) {
  const calls: RecordedCall[] = [];
  const queue: MockReply[] = [];
  const fetch = async (input: string, init: RequestInit = {}): Promise<Response> => {
    const call: RecordedCall = {
      method: init.method ?? "GET",
      url: new URL(input),
      headers: new Headers(init.headers),
      body: typeof init.body === "string" ? JSON.parse(init.body) : undefined,
    };
    calls.push(call);
    const reply = queue.shift() ?? handler(call);
    const status = reply.status ?? 200;
    return new Response(reply.body === undefined ? null : JSON.stringify(reply.body), {
      status,
      headers: {
        "content-type": "application/json",
        "x-request-id": `req_${calls.length}`,
        "x-credits-used": "1",
        "x-credits-remaining": "499",
        ...reply.headers,
      },
    });
  };
  return { fetch, calls, queue };
}

export function clientWith(mock: ReturnType<typeof mockFetch>, options: ValoDataOptions = {}) {
  return new ValoData({ apiKey: "vd_test_dummy", fetch: mock.fetch, ...options });
}
