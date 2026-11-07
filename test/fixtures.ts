// Response bodies shaped from the OpenAPI document; `satisfies` checks them against the generated types.
import type {
  BatchResponse,
  CardDetail,
  CardPage,
  CardPriceHistory,
  CardPrices,
  CardSummary,
  CompareResponse,
  EditionOverview,
  EditionPage,
  EditionSummary,
  ErrorBody,
  GameRarities,
  GamesResponse,
  IdentifyResponse,
  PriceQuote,
  PriceSummary,
  RecommendedPrice,
  SealedDetail,
  SealedPage,
  SealedPriceHistory,
  SealedPrices,
  SealedSummary,
  TopMovers,
  TopPriced,
  UsageResponse,
} from "../src/index.js";

export const card = (cardId = 101): CardSummary => ({
  card_id: cardId,
  game: "pokemon",
  name: "Charizard ex",
  number: "199/165",
  language: "en",
  edition: { id: 12, name: "151" },
  variants: ["default"],
});

export const sealedProduct = (sealedId = 55): SealedSummary => ({
  sealed_id: sealedId,
  game: "pokemon",
  name: "151 Booster Bundle",
  language: "en",
  slug: "151-booster-bundle",
});

export const edition: EditionSummary = { edition_id: 12, game: "pokemon", name: "151", language: "en", card_count: 207 };

const quote: PriceQuote = {
  source: "cardmarket",
  metric: "trend",
  amount: 120.5,
  currency: "EUR",
  variant: "default",
  card_language: "en",
  market_language: "global",
  observed_at: "2026-11-06",
  computed_at: "2026-11-06T04:00:00Z",
  status: "available",
};

const recommended: RecommendedPrice = { amount: 118, currency: "EUR", source: "cardmarket", observed_at: "2026-11-06" };

export const summary: PriceSummary = {
  type: "card",
  card: card(),
  recommended,
  reliability: "ok",
  changes: [{ period_days: 30, change_pct: 4.2, source: "cardmarket" }],
  prices: [quote],
};

export const games = {
  items: [
    {
      slug: "pokemon",
      name: "Pokemon",
      languages: ["fr", "en"],
      coverage: { cardmarket: { status: "available", refs_total: 10, refs_with_value: 9 } },
      editions: 400,
      vision: "available",
      vision_languages: ["fr", "en"],
    },
  ],
} satisfies GamesResponse;

export const rarities = {
  game: "pokemon",
  rarities: [{ code: "holo_rare", name_en: "Holo Rare", name_fr: "Rare Holo", rank: 3, languages: ["en"], card_count: 10 }],
} satisfies GameRarities;

export const editionPage = { items: [edition], next_cursor: null } satisfies EditionPage;
export const cardPage = (items: CardSummary[], next: string | null): CardPage => ({ items, next_cursor: next });
export const sealedPage = (items: SealedSummary[], next: string | null): SealedPage => ({ items, next_cursor: next });
export const cardDetail = card() satisfies CardDetail;
export const cardPrices = { card_id: 101, prices: [quote] } satisfies CardPrices;
export const batch = {
  items: [{ id: "101", type: "card", status: "ok", card: card(), prices: [quote] }],
} satisfies BatchResponse;
export const cardHistory = {
  card_id: 101,
  source: "cardmarket",
  variant: "default",
  market_language: "global",
  from: "2026-10-01",
  to: "2026-11-01",
  points: [{ date: "2026-10-01", amount: 110, currency: "EUR", metric: "trend" }],
} satisfies CardPriceHistory;
export const sealedDetail = sealedProduct() satisfies SealedDetail;
export const sealedPrices = { sealed_id: 55, prices: [quote] } satisfies SealedPrices;
export const sealedHistory = {
  sealed_id: 55,
  source: "us_market",
  variant: "default",
  market_language: "global",
  from: "2026-10-01",
  to: "2026-11-01",
  points: [{ date: "2026-10-01", amount: 45, currency: "USD", metric: "market" }],
} satisfies SealedPriceHistory;
export const identify = {
  query: "charizard 199 151",
  candidates: [{ card: card(), score: 0.92, matched_on: ["number", "name", "edition"] }],
} satisfies IdentifyResponse;
export const compare = {
  items: [{ id: "101", status: "ok", summary }],
} satisfies CompareResponse;
export const topMovers = {
  game: "pokemon",
  period_days: 30,
  direction: "up",
  reliable: false,
  items: [{ card: card(), recommended, change_pct: 25, change_source: "cardmarket" }],
} satisfies TopMovers;
export const topPriced = {
  game: "pokemon",
  kind: "card",
  complete: true,
  items: [{ card: card(), recommended }],
} satisfies TopPriced;
export const overview = {
  edition,
  cards_priced: 200,
  coverage: { cardmarket: 200, us_market: 190, ebay: 80 },
  chase_cards: [{ card: card(), recommended }],
  sealed: [],
} satisfies EditionOverview;
export const usage = {
  product: "data",
  plan_id: "sandbox",
  status: "active",
  period_start: "2026-11-01",
  period_end: "2026-11-30",
  resets_at: "2026-12-01T00:00:00Z",
  credits_included: 500,
  credits_used: 12,
  credits_remaining: 488,
  rate_limit_per_minute: 30,
  daily: [{ date: "2026-11-07", credits: 12, requests: 10, errors: 0 }],
} satisfies UsageResponse;

export const errorBody = (code: string, extra: Record<string, unknown> = {}): ErrorBody => ({
  error: {
    code,
    message: `Error ${code}`,
    request_id: "req_err",
    docs_url: `https://valotcg.com/developers/docs#error-${code}`,
    ...extra,
  },
});
