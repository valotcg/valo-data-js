import { paginate } from "./pagination.js";
import { segment, type Transport } from "./core.js";
import type {
  ApiResponse,
  BatchRequest,
  BatchResponse,
  CardDetail,
  CardPage,
  CardPriceHistory,
  CardPriceHistoryParams,
  CardPrices,
  CardPricesParams,
  CardSearchParams,
  CardSummary,
  CardSummaryParams,
  CompareRequest,
  CompareResponse,
  EditionListParams,
  EditionOverview,
  EditionPage,
  EditionSummary,
  GameRarities,
  GamesResponse,
  IdentifyParams,
  IdentifyResponse,
  PriceSummary,
  RequestOptions,
  SealedDetail,
  SealedPage,
  SealedPriceHistory,
  SealedPriceHistoryParams,
  SealedPrices,
  SealedSearchParams,
  SealedSummary,
  TopMovers,
  TopMoversParams,
  TopPriced,
  TopPricedParams,
} from "./types.js";

const DATA = "/data/v1";

/** `GET /data/v1/games` and `/games/{game}/rarities`. */
export class Games {
  constructor(private readonly transport: Transport) {}

  /** Games served by the API with their coverage (0 credit). */
  list(options?: RequestOptions): Promise<ApiResponse<GamesResponse>> {
    return this.transport.request({ method: "GET", path: `${DATA}/games`, ...options });
  }

  /** Canonical rarity codes of a game (0 credit). */
  rarities(game: string, options?: RequestOptions): Promise<ApiResponse<GameRarities>> {
    return this.transport.request({ method: "GET", path: `${DATA}/games/${segment(game)}/rarities`, ...options });
  }
}

/** `GET /data/v1/editions`. */
export class Editions {
  constructor(private readonly transport: Transport) {}

  /** One page of editions of a game. */
  list(params: EditionListParams, options?: RequestOptions): Promise<ApiResponse<EditionPage>> {
    return this.transport.request({ method: "GET", path: `${DATA}/editions`, query: params, ...options });
  }

  /** Every edition matching `params`, following `next_cursor` (one billed call per page). */
  iterList(params: EditionListParams, options?: RequestOptions): AsyncGenerator<EditionSummary, void, undefined> {
    return paginate((p: EditionListParams, o?: RequestOptions) => this.list(p, o), params, options);
  }
}

/** `/data/v1/cards` routes. */
export class Cards {
  constructor(private readonly transport: Transport) {}

  /** One page of cards of a game, filtered by name or number, edition, language or rarity. */
  search(params: CardSearchParams, options?: RequestOptions): Promise<ApiResponse<CardPage>> {
    return this.transport.request({ method: "GET", path: `${DATA}/cards`, query: params, ...options });
  }

  /** Every card matching `params`, following `next_cursor` (one billed call per page). */
  iterSearch(params: CardSearchParams, options?: RequestOptions): AsyncGenerator<CardSummary, void, undefined> {
    return paginate((p: CardSearchParams, o?: RequestOptions) => this.search(p, o), params, options);
  }

  /** Card detail. */
  get(cardId: number, options?: RequestOptions): Promise<ApiResponse<CardDetail>> {
    return this.transport.request({ method: "GET", path: `${DATA}/cards/${segment(cardId)}`, ...options });
  }

  /** Current prices of a card on every source; `include: ['graded', 'population']` adds billed blocks. */
  prices(cardId: number, params: CardPricesParams = {}, options?: RequestOptions): Promise<ApiResponse<CardPrices>> {
    return this.transport.request({
      method: "GET",
      path: `${DATA}/cards/${segment(cardId)}/prices`,
      query: params,
      ...options,
    });
  }

  /** Prices of up to 100 cards, or sealed products as `sealed:<id>`, in one call. */
  batch(body: BatchRequest, options?: RequestOptions): Promise<ApiResponse<BatchResponse>> {
    return this.transport.request({ method: "POST", path: `${DATA}/cards/batch`, body, ...options });
  }

  /** Daily price history of a card on one source. */
  priceHistory(
    cardId: number,
    params: CardPriceHistoryParams,
    options?: RequestOptions,
  ): Promise<ApiResponse<CardPriceHistory>> {
    return this.transport.request({
      method: "GET",
      path: `${DATA}/cards/${segment(cardId)}/price-history`,
      query: params,
      ...options,
    });
  }
}

/** `/data/v1/sealed` routes. */
export class Sealed {
  constructor(private readonly transport: Transport) {}

  /** One page of sealed products of a game. */
  search(params: SealedSearchParams, options?: RequestOptions): Promise<ApiResponse<SealedPage>> {
    return this.transport.request({ method: "GET", path: `${DATA}/sealed`, query: params, ...options });
  }

  /** Every sealed product matching `params`, following `next_cursor` (one billed call per page). */
  iterSearch(params: SealedSearchParams, options?: RequestOptions): AsyncGenerator<SealedSummary, void, undefined> {
    return paginate((p: SealedSearchParams, o?: RequestOptions) => this.search(p, o), params, options);
  }

  /** Sealed product detail. */
  get(sealedId: number, options?: RequestOptions): Promise<ApiResponse<SealedDetail>> {
    return this.transport.request({ method: "GET", path: `${DATA}/sealed/${segment(sealedId)}`, ...options });
  }

  /** Current prices of a sealed product on every source. */
  prices(sealedId: number, options?: RequestOptions): Promise<ApiResponse<SealedPrices>> {
    return this.transport.request({ method: "GET", path: `${DATA}/sealed/${segment(sealedId)}/prices`, ...options });
  }

  /** Daily price history of a sealed product on one source. */
  priceHistory(
    sealedId: number,
    params: SealedPriceHistoryParams,
    options?: RequestOptions,
  ): Promise<ApiResponse<SealedPriceHistory>> {
    return this.transport.request({
      method: "GET",
      path: `${DATA}/sealed/${segment(sealedId)}/price-history`,
      query: params,
      ...options,
    });
  }
}

/** `/data/v1/analysis` routes. */
export class Analysis {
  constructor(private readonly transport: Transport) {}

  /** Up to 5 candidate cards for free text such as `"charizard 199 151"`, best first. */
  identify(params: IdentifyParams, options?: RequestOptions): Promise<ApiResponse<IdentifyResponse>> {
    return this.transport.request({ method: "GET", path: `${DATA}/analysis/identify`, query: params, ...options });
  }

  /** Recommended price, reliability, 7/30/90 day changes and every source of a card. */
  cardSummary(
    cardId: number,
    params: CardSummaryParams = {},
    options?: RequestOptions,
  ): Promise<ApiResponse<PriceSummary>> {
    return this.transport.request({
      method: "GET",
      path: `${DATA}/analysis/cards/${segment(cardId)}/summary`,
      query: params,
      ...options,
    });
  }

  /** Recommended price, reliability, changes and every source of a sealed product. */
  sealedSummary(sealedId: number, options?: RequestOptions): Promise<ApiResponse<PriceSummary>> {
    return this.transport.request({
      method: "GET",
      path: `${DATA}/analysis/sealed/${segment(sealedId)}/summary`,
      ...options,
    });
  }

  /** Summaries of up to 10 cards or `sealed:<id>` products side by side. */
  compare(body: CompareRequest, options?: RequestOptions): Promise<ApiResponse<CompareResponse>> {
    return this.transport.request({ method: "POST", path: `${DATA}/analysis/compare`, body, ...options });
  }

  /** Largest price rises or falls of a game over 7, 30 or 90 days. */
  topMovers(params: TopMoversParams, options?: RequestOptions): Promise<ApiResponse<TopMovers>> {
    return this.transport.request({ method: "GET", path: `${DATA}/analysis/top-movers`, query: params, ...options });
  }

  /** Highest priced cards or sealed products of a game. */
  topPriced(params: TopPricedParams, options?: RequestOptions): Promise<ApiResponse<TopPriced>> {
    return this.transport.request({ method: "GET", path: `${DATA}/analysis/top-priced`, query: params, ...options });
  }

  /** Value, coverage and top cards of an edition. */
  editionOverview(editionId: number, options?: RequestOptions): Promise<ApiResponse<EditionOverview>> {
    return this.transport.request({
      method: "GET",
      path: `${DATA}/analysis/editions/${segment(editionId)}/overview`,
      ...options,
    });
  }
}
