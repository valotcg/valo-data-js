import type { components, paths } from "./generated/schema.js";

type Schemas = components["schemas"];

/** Parsed response headers attached to every successful call. */
export interface ResponseMeta {
  /** Credits billed for this call (`X-Credits-Used`), `null` when the header is absent. */
  creditsUsed: number | null;
  /** Credits left in the current window (`X-Credits-Remaining`), `null` when the header is absent. */
  creditsRemaining: number | null;
  /** Request identifier (`X-Request-Id`), quote it when contacting support. */
  requestId: string | null;
  /** Per-minute throughput (`X-RateLimit-*`), `null` when the headers are absent. */
  rateLimit: { limit: number; remaining: number; reset: number } | null;
}

/** Every method resolves to `{ data, meta }`: `data` is the JSON body, `meta` the parsed headers. */
export interface ApiResponse<T> {
  data: T;
  meta: ResponseMeta;
}

/** Per-call options. */
export interface RequestOptions {
  /** Aborts the request (and any pending retry wait). */
  signal?: AbortSignal;
}

type JsonContent<R> = R extends { content: { "application/json": infer B } } ? B : never;
type Operation<P extends keyof paths, M extends "get" | "post"> = NonNullable<paths[P][M]>;

/** Query parameters of `GET path`, from the OpenAPI document. */
export type QueryParams<P extends keyof paths> = Operation<P, "get"> extends { parameters: { query?: infer Q } }
  ? NonNullable<Q>
  : never;

/** JSON body of a 200 response. */
export type ResponseBody<P extends keyof paths, M extends "get" | "post" = "get"> = Operation<P, M> extends {
  responses: { 200: infer R };
}
  ? JsonContent<R>
  : never;

/** JSON request body of `POST path`. */
export type RequestBody<P extends keyof paths> = Operation<P, "post"> extends {
  requestBody: { content: { "application/json": infer B } };
}
  ? B
  : never;

/** Values of the `include` query parameter, as an array or a comma separated string. */
export type Include = "graded" | "population";

export type Language = "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt";

// Query parameter shapes.
export type EditionListParams = QueryParams<"/data/v1/editions">;
export type CardSearchParams = QueryParams<"/data/v1/cards">;
export type CardPricesParams = { include?: Include[] | string };
export type CardPriceHistoryParams = QueryParams<"/data/v1/cards/{card_id}/price-history">;
export type SealedSearchParams = QueryParams<"/data/v1/sealed">;
export type SealedPriceHistoryParams = QueryParams<"/data/v1/sealed/{sealed_id}/price-history">;
export type IdentifyParams = QueryParams<"/data/v1/analysis/identify">;
export type CardSummaryParams = { include?: Include[] | string };
export type TopMoversParams = QueryParams<"/data/v1/analysis/top-movers">;
export type TopPricedParams = QueryParams<"/data/v1/analysis/top-priced">;
export type UsageParams = QueryParams<"/developer/v1/usage">;

// Request bodies.
export type BatchRequest = Schemas["BatchRequest"];
export type CompareRequest = Schemas["CompareRequest"];

// Response bodies and nested objects.
export type GamesResponse = Schemas["GamesResponse"];
export type GameInfo = Schemas["GameInfo"];
export type GameRarities = Schemas["GameRarities"];
export type RarityInfo = Schemas["RarityInfo"];
export type EditionSummary = Schemas["EditionSummary"];
export type EditionRef = Schemas["EditionRef"];
export type EditionPage = Schemas["Page_EditionSummary_"];
export type CardSummary = Schemas["CardSummary"];
export type CardPage = Schemas["Page_CardSummary_"];
export type CardDetail = Schemas["CardDetail"];
export type CardPrices = Schemas["CardPrices"];
export type CardPriceHistory = Schemas["CardPriceHistory"];
export type BatchResponse = Schemas["BatchResponse"];
export type BatchItem = Schemas["BatchItem"];
export type SealedSummary = Schemas["SealedSummary"];
export type SealedPage = Schemas["Page_SealedSummary_"];
export type SealedDetail = Schemas["SealedDetail"];
export type SealedPrices = Schemas["SealedPrices"];
export type SealedPriceHistory = Schemas["SealedPriceHistory"];
export type HistoryPoint = Schemas["HistoryPoint"];
export type PriceQuote = Schemas["PriceQuote"];
export type ConditionPrice = Schemas["ConditionPrice"];
export type GradedPrices = Schemas["GradedPrices"];
export type GradedQuote = Schemas["GradedQuote"];
export type PopulationReport = Schemas["PopulationReport"];
export type RecommendedPrice = Schemas["RecommendedPrice"];
export type RetailPrice = Schemas["RetailPrice"];
export type OtherLanguage = Schemas["OtherLanguage"];
export type IdentifyResponse = Schemas["IdentifyResponse"];
export type IdentifyCandidate = Schemas["IdentifyCandidate"];
export type PriceSummary = Schemas["PriceSummary"];
export type PriceChange = Schemas["PriceChange"];
export type CompareResponse = Schemas["CompareResponse"];
export type CompareItem = Schemas["CompareItem"];
export type TopMovers = Schemas["TopMovers"];
export type Mover = Schemas["Mover"];
export type TopPriced = Schemas["TopPriced"];
export type PricedCard = Schemas["PricedCard"];
export type PricedSealed = Schemas["PricedSealed"];
export type EditionOverview = Schemas["EditionOverview"];
export type UsageResponse = Schemas["UsageResponse"];
export type DailyUsage = Schemas["DailyUsage"];
export type Overage = Schemas["Overage"];
export type ErrorBody = Schemas["ErrorResponse"];
export type ErrorDetail = Schemas["ErrorDetail"];
