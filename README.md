# valotcg

Official JavaScript and TypeScript SDK for **Valo.Data**, the ValoTCG trading card price API: cards and sealed products of 14 TCGs, current prices per source, history, recommended price and analysis.

- Zero runtime dependencies, native `fetch` (Node 18+ and browsers)
- ESM and CommonJS builds with type declarations
- Types generated from the [OpenAPI document](https://api.valotcg.com/data/v1/openapi.json) (snapshot in [`openapi.json`](./openapi.json))
- Typed errors, automatic retry of `429 rate_limited`, async iteration over paginated results

## Install

```bash
npm install valotcg
```

## API key

Create a free Sandbox key at <https://valotcg.com/developers/account>. The Sandbox includes 500 credits and 250 distinct cards per month and 100 billed requests per day, with no credit card. Paid plans are listed at <https://valotcg.com/developers/pricing>.

Pass the key to the client, or set `VALO_DATA_API_KEY` in the environment:

```ts
import { ValoData } from "valotcg";

const client = new ValoData({ apiKey: process.env.VALO_DATA_API_KEY });
```

| Option       | Default                    | Description                                                          |
| ------------ | -------------------------- | -------------------------------------------------------------------- |
| `apiKey`     | `VALO_DATA_API_KEY`        | `vd_live_...` or `vd_test_...`, sent as `Authorization: Bearer`.     |
| `baseUrl`    | `https://api.valotcg.com`  | API origin.                                                          |
| `maxRetries` | `2`                        | Retries of a `429 rate_limited` or `concurrency_limited` after `Retry-After`. `0` disables. |
| `fetch`      | global `fetch`             | Custom `fetch` implementation (proxy, instrumentation, tests).       |

## Identify a card, then read its price summary

```ts
import { ValoData } from "valotcg";

const client = new ValoData();

const { data: found } = await client.analysis.identify({ q: "charizard 199 151", game: "pokemon" });
const best = found.candidates[0];
if (best) {
  const { data: summary, meta } = await client.analysis.cardSummary(best.card.card_id);
  console.log(best.card.name, best.card.edition.name, summary.recommended.amount, summary.recommended.currency);
  console.log(`${meta.creditsUsed} credit(s) used, ${meta.creditsRemaining} left`);
}
```

## Response shape

Every method resolves to `{ data, meta }`:

- `data`: the JSON body, typed from the OpenAPI document.
- `meta`: parsed response headers.

```ts
interface ResponseMeta {
  creditsUsed: number | null;      // X-Credits-Used
  creditsRemaining: number | null; // X-Credits-Remaining
  requestId: string | null;        // X-Request-Id, quote it when contacting support
  rateLimit: { limit: number; remaining: number; reset: number } | null; // X-RateLimit-*
}
```

## Batch prices

Up to 100 card ids, or sealed product ids prefixed with `sealed:`, in one call:

```ts
const { data } = await client.cards.batch({ ids: [101, 102, "sealed:55"], include: ["graded"] });
for (const item of data.items) {
  if (item.status === "ok") console.log(item.id, item.prices?.[0]?.amount, item.prices?.[0]?.currency);
}
```

## Pagination

Search routes return a page with `next_cursor`. The `iter*` helpers follow it and yield every item. Each page is one billed call; `break` stops fetching.

```ts
for await (const card of client.cards.iterSearch({ game: "pokemon", q: "pikachu", page_size: 100 })) {
  console.log(card.card_id, card.name, card.number);
}
```

Single pages: `client.cards.search(params)`, then pass `cursor: page.next_cursor` to the next call.

## Methods

| Method                                          | Route                                                 |
| ----------------------------------------------- | ----------------------------------------------------- |
| `games.list()`                                  | `GET /data/v1/games`                                  |
| `games.rarities(game)`                          | `GET /data/v1/games/{game}/rarities`                  |
| `editions.list(params)` / `editions.iterList`   | `GET /data/v1/editions`                               |
| `cards.search(params)` / `cards.iterSearch`     | `GET /data/v1/cards`                                  |
| `cards.get(cardId)`                             | `GET /data/v1/cards/{card_id}`                        |
| `cards.prices(cardId, { include })`             | `GET /data/v1/cards/{card_id}/prices`                 |
| `cards.batch({ ids, include })`                 | `POST /data/v1/cards/batch`                           |
| `cards.priceHistory(cardId, params)`            | `GET /data/v1/cards/{card_id}/price-history`          |
| `sealed.search(params)` / `sealed.iterSearch`   | `GET /data/v1/sealed`                                 |
| `sealed.get(sealedId)`                          | `GET /data/v1/sealed/{sealed_id}`                     |
| `sealed.prices(sealedId)`                       | `GET /data/v1/sealed/{sealed_id}/prices`              |
| `sealed.priceHistory(sealedId, params)`         | `GET /data/v1/sealed/{sealed_id}/price-history`       |
| `analysis.identify({ q, game, language })`      | `GET /data/v1/analysis/identify`                      |
| `analysis.cardSummary(cardId, { include })`     | `GET /data/v1/analysis/cards/{card_id}/summary`       |
| `analysis.sealedSummary(sealedId)`              | `GET /data/v1/analysis/sealed/{sealed_id}/summary`    |
| `analysis.compare({ ids, include })`            | `POST /data/v1/analysis/compare`                      |
| `analysis.topMovers(params)`                    | `GET /data/v1/analysis/top-movers`                    |
| `analysis.topPriced(params)`                    | `GET /data/v1/analysis/top-priced`                    |
| `analysis.editionOverview(editionId)`           | `GET /data/v1/analysis/editions/{edition_id}/overview`|
| `usage({ product })`                            | `GET /developer/v1/usage`                             |

`include` accepts an array (`["graded", "population"]`) or a comma separated string. Every method takes a last optional `{ signal }` to abort the request. Prices stay in the native currency of each source (`EUR` for Cardmarket, `USD` for the US market, `source: "us_market"`); the recommended price is in EUR.

Credit costs per route are in the [documentation](https://valotcg.com/developers/docs).

## Errors

Non-2xx responses throw a subclass of `ValoDataError`, built from the body `{"error": {"code", "message", "request_id", "docs_url"}}`:

| Class                   | Status    | Examples of `code`                                                                  |
| ----------------------- | --------- | ----------------------------------------------------------------------------------- |
| `AuthenticationError`   | 401       | `invalid_api_key`, `api_key_expired`                                                |
| `PermissionDeniedError` | 403       | `insufficient_scope`, `plan_feature_unavailable`, `ip_not_allowed`                  |
| `NotFoundError`         | 404       | `card_not_found`, `sealed_not_found`, `edition_not_found`, `game_not_found`         |
| `ValidationError`       | 400, 422  | `invalid_request`, `invalid_cursor`, `range_exceeds_plan`                           |
| `RateLimitError`        | 429       | `rate_limited`, `quota_exceeded`, `daily_limit_reached`, `catalog_limit_reached`    |
| `ServerError`           | 5xx       | `quota_unavailable`                                                                 |

Every error carries `status`, `code`, `message`, `requestId`, `docsUrl` and the parsed `body` (extra fields such as `credits_remaining`). `RateLimitError` adds `retryAfter` (seconds) and `resetsAt` (ISO 8601). Network failures throw `ValoDataError` with `code: "connection_error"`.

A `429 rate_limited` or `concurrency_limited` is retried automatically after `Retry-After`, up to `maxRetries` times (`maxRetries: 0` disables it). Quota, daily, catalog and key cap limits (`quota_exceeded`, `daily_limit_reached`, `catalog_limit_reached`, `key_credit_cap_reached`) are never retried: they lift at `resetsAt`.

```ts
import { NotFoundError, RateLimitError, ValoDataError } from "valotcg";

try {
  await client.cards.get(999999999);
} catch (error) {
  if (error instanceof NotFoundError) console.log("unknown card");
  else if (error instanceof RateLimitError) console.log(error.code, "until", error.resetsAt);
  else if (error instanceof ValoDataError) console.log(error.code, error.requestId);
  else throw error;
}
```

## Forward compatibility

Responses are returned as sent, without runtime validation. Enum fields of responses are typed as open unions, for example `source: "cardmarket" | "us_market" | "ebay" | (string & {})`: editors still suggest the known values, and a value added by the API later neither breaks at runtime nor fails to typecheck. Handle a default case when you switch on such a field.

## Browsers

The client runs in browsers, but an API key in front-end code can be read by anyone and spent on your quota. Never ship a live key to the browser: call Valo.Data from your server (or a serverless function) and expose only the data your page needs.

## TypeScript

Request and response types are exported (`CardSummary`, `PriceSummary`, `CardSearchParams`, `RateLimitError`...), as well as the raw generated `paths` and `components` types. The types are regenerated from the live OpenAPI document with:

```bash
npm run regenerate            # downloads openapi.json, then rewrites src/generated/schema.ts
npm run regenerate -- --local # rewrites the types from the committed openapi.json
```

## Links

- Documentation: <https://valotcg.com/developers/docs>
- OpenAPI: <https://api.valotcg.com/data/v1/openapi.json>
- Postman collection: <https://www.postman.com/valotcg/valotcg>
- MCP server: <https://github.com/valotcg/valo-ia-mcp>
- RapidAPI: <https://rapidapi.com/Stephd91/api/valo-data-trading-card-prices>
- Plans: <https://valotcg.com/developers/pricing>

## Attribution

When you display Valo.Data prices, credit the source: "Data: [ValoTCG](https://valotcg.com)".

## Development

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
VALO_DATA_API_KEY=vd_test_... npm run test:live   # optional live smoke test, spends a few credits
```

## License

MIT, see [LICENSE](./LICENSE).
