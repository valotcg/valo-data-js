# Changelog

All notable changes to this package are documented here. The package version follows the version of the Valo.Data API (`info.version` of the OpenAPI document).

## 1.0.1 - 2026-11-07

First release, aligned with Valo.Data API 1.0.1.

- `ValoData` client with `apiKey` (or `VALO_DATA_API_KEY`), `baseUrl`, `maxRetries` and `fetch` options.
- Typed methods for the 20 routes: games, rarities, editions, cards, card prices, batch, card price history, sealed products, sealed prices and history, identify, card and sealed summaries, compare, top movers, top priced, edition overview and usage.
- Every response resolves to `{ data, meta }` with credits used, credits remaining, request id and rate limit headers.
- Typed errors: `ValoDataError`, `AuthenticationError`, `PermissionDeniedError`, `NotFoundError`, `ValidationError`, `RateLimitError`, `ServerError`.
- Automatic retry of `429 rate_limited` and `concurrency_limited` after `Retry-After`, disabled with `maxRetries: 0`.
- Forward compatible response types: enums are open unions (`"a" | "b" | (string & {})`), no runtime validation.
- Async iterators over paginated searches: `cards.iterSearch`, `sealed.iterSearch`, `editions.iterList`.
- Types generated from the OpenAPI document with `npm run regenerate`.
