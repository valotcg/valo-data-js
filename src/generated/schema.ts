/**
 * Generated from the Valo.Data OpenAPI document, version 1.0.1.
 * Do not edit by hand: run `npm run regenerate`.
 */
export type paths = {
    "/data/v1/games": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List games (0 credit) */
        get: operations["get_games_data_v1_games_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/games/{game}/rarities": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List rarity codes of a game (0 credit)
         * @description Canonical rarity codes of a game: the values of `rarity_code` on cards, accepted by the `rarity` filter of
         *     `GET /data/v1/cards`. Every code of the game is listed, including codes no card carries yet.
         */
        get: operations["get_game_rarities_data_v1_games__game__rarities_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/editions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List editions of a game (1 credit) */
        get: operations["search_editions_data_v1_editions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search cards (1 credit) */
        get: operations["search_cards_data_v1_cards_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/cards/{card_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Card sheet (1 credit) */
        get: operations["read_card_data_v1_cards__card_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/cards/{card_id}/prices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Current prices (1 credit, +1 per include) */
        get: operations["read_card_prices_data_v1_cards__card_id__prices_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/cards/batch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Batch prices for cards and sealed products (1 credit per 100, +1 per card include) */
        post: operations["batch_prices_data_v1_cards_batch_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/cards/{card_id}/price-history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Daily price history of one source (3 credits) */
        get: operations["read_card_price_history_data_v1_cards__card_id__price_history_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/sealed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search sealed products (1 credit) */
        get: operations["search_sealed_data_v1_sealed_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/sealed/{sealed_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sealed product sheet (1 credit) */
        get: operations["read_sealed_data_v1_sealed__sealed_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/sealed/{sealed_id}/prices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Current prices (1 credit) */
        get: operations["read_sealed_prices_data_v1_sealed__sealed_id__prices_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/sealed/{sealed_id}/price-history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Daily price history of one source (3 credits) */
        get: operations["read_sealed_price_history_data_v1_sealed__sealed_id__price_history_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/analysis/identify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Identify a card from free text (1 credit) */
        get: operations["identify_data_v1_analysis_identify_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/analysis/cards/{card_id}/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Recommended price, reliability and changes of a card (1 credit, +1 per include) */
        get: operations["card_price_summary_data_v1_analysis_cards__card_id__summary_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/analysis/sealed/{sealed_id}/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Recommended price, reliability and changes of a sealed product (1 credit) */
        get: operations["sealed_price_summary_data_v1_analysis_sealed__sealed_id__summary_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/analysis/compare": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Compare up to 10 cards and sealed products (1 credit, +1 per card include) */
        post: operations["compare_prices_data_v1_analysis_compare_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/analysis/top-movers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Largest price rises or falls of a game or an edition (3 credits) */
        get: operations["read_top_movers_data_v1_analysis_top_movers_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/analysis/top-priced": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Most valuable cards or sealed products of a game, an edition or a language (3 credits)
         * @description Ranked by `recommended.amount`, the price the ValoTCG app shows (EUR), across the whole catalogue of the game,
         *     every edition and language unless filtered.
         */
        get: operations["read_top_priced_data_v1_analysis_top_priced_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data/v1/analysis/editions/{edition_id}/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Chase cards, sealed products and price coverage of an edition (3 credits) */
        get: operations["read_edition_overview_data_v1_analysis_editions__edition_id__overview_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/developer/v1/usage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Credits, scans or questions used in the current window (0 credit) */
        get: operations["get_usage_developer_v1_usage_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /** BatchItem */
        BatchItem: {
            /**
             * Id
             * @description The id as sent.
             */
            id: string;
            /**
             * Type
             * @description `null` when the id is not recognised.
             */
            type: ("card" | "sealed" | (string & {})) | null;
            /**
             * Status
             * @enum {string}
             */
            status: "ok" | "not_found" | (string & {});
            card?: components["schemas"]["CardSummary"] | null;
            sealed?: components["schemas"]["SealedSummary"] | null;
            /** Prices */
            prices?: components["schemas"]["PriceQuote"][] | null;
            graded?: components["schemas"]["GradedPrices"] | null;
            /** Population */
            population?: components["schemas"]["PopulationReport"][] | null;
        };
        /** BatchRequest */
        BatchRequest: {
            /**
             * Ids
             * @description Up to 100 card ids, or sealed product ids prefixed with `sealed:` (e.g. `sealed:1234`).
             */
            ids: (number | string)[];
            /**
             * Include
             * @description Extra blocks, billed per card.
             */
            include?: ("graded" | "population")[];
        };
        /** BatchResponse */
        BatchResponse: {
            /** Items */
            items: components["schemas"]["BatchItem"][];
        };
        /** CardDetail */
        CardDetail: {
            /**
             * Card Id
             * @description Stable Valo.Data card id.
             */
            card_id: number;
            /**
             * Game
             * @description Game slug, e.g. `pokemon`, `onepiece`, `star_wars_unlimited`.
             */
            game: string;
            /**
             * Name
             * @description Printed name in the card language.
             */
            name: string;
            /**
             * Name En
             * @description English name when known; `name` on an English card.
             */
            name_en?: string | null;
            /**
             * Number
             * @description Collector number as printed, e.g. `001/102`, `OP01-012`.
             */
            number: string;
            /**
             * Rarity
             * @description Rarity label as printed on the card or as given by the source, in the card language, e.g. `Illustration spéciale rare`, `SuperRare`.
             */
            rarity?: string | null;
            /**
             * Rarity Code
             * @description Canonical rarity code, shared by every language of one rarity system, e.g. `special_illustration_rare`. Japanese and Chinese Pokémon prints follow their own system (`sar`, `ur`). `null` when the rarity is unknown. Codes of a game: `GET /data/v1/games/{game}/rarities`.
             */
            rarity_code?: string | null;
            /**
             * Language
             * @description Language of the printed card.
             * @enum {string}
             */
            language: "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            edition: components["schemas"]["EditionRef"];
            /** Image Url */
            image_url?: string | null;
            /**
             * Variants
             * @description Price variants tracked for this card: `default` (main printing) and, for games pricing foils separately, `foil`.
             */
            variants: ("default" | "foil" | (string & {}))[];
            /**
             * Cardmarket Product Id
             * @description Cardmarket idProduct; `null` on Sandbox and Starter.
             */
            cardmarket_product_id?: number | null;
            /**
             * US market product id
             * @description US market product id; `null` on Sandbox and Starter.
             */
            tcgplayer_product_id?: number | null;
            /**
             * Series
             * @description Series or block of the edition.
             */
            series?: string | null;
            /** Illustrator */
            illustrator?: string | null;
            /** Card Type */
            card_type?: string | null;
            /**
             * Cardmarket Url
             * @description Cardmarket product page; `null` on Sandbox and Starter.
             */
            cardmarket_url?: string | null;
            /**
             * US market URL
             * @description US market product page; `null` on Sandbox and Starter.
             */
            tcgplayer_url?: string | null;
            /**
             * Other Languages
             * @description The same card in other languages, sorted by language then id. One language can appear several times when the same artwork was printed in several sets: compare `edition` and `number` through the batch route. `[]` when no other version is known; `null` on Sandbox and Starter.
             */
            other_languages?: components["schemas"]["OtherLanguage"][] | null;
        };
        /** CardPriceHistory */
        CardPriceHistory: {
            /**
             * Source
             * @enum {string}
             */
            source: "cardmarket" | "us_market" | "ebay" | (string & {});
            /**
             * Variant
             * @enum {string}
             */
            variant: "default" | "foil" | (string & {});
            /**
             * Market Language
             * @description Language of the listings behind the curve, as on current prices: `global` for Cardmarket across all languages, `fr` for French Cardmarket listings (cheapest offer, collected weekly at best), `en` for the US market, the language of the card or sealed product for eBay sales.
             * @enum {string}
             */
            market_language: "global" | "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            /**
             * From
             * Format: date
             */
            from: string;
            /**
             * To
             * Format: date
             */
            to: string;
            /**
             * Points
             * @description One point per observed day; gaps are not interpolated.
             */
            points: components["schemas"]["HistoryPoint"][];
            /** Card Id */
            card_id: number;
        };
        /** CardPrices */
        CardPrices: {
            /** Card Id */
            card_id: number;
            /** Prices */
            prices: components["schemas"]["PriceQuote"][];
            /** @description Present with `include=graded`. */
            graded?: components["schemas"]["GradedPrices"] | null;
            /**
             * Population
             * @description Present with `include=population`.
             */
            population?: components["schemas"]["PopulationReport"][] | null;
        };
        /** CardSummary */
        CardSummary: {
            /**
             * Card Id
             * @description Stable Valo.Data card id.
             */
            card_id: number;
            /**
             * Game
             * @description Game slug, e.g. `pokemon`, `onepiece`, `star_wars_unlimited`.
             */
            game: string;
            /**
             * Name
             * @description Printed name in the card language.
             */
            name: string;
            /**
             * Name En
             * @description English name when known; `name` on an English card.
             */
            name_en?: string | null;
            /**
             * Number
             * @description Collector number as printed, e.g. `001/102`, `OP01-012`.
             */
            number: string;
            /**
             * Rarity
             * @description Rarity label as printed on the card or as given by the source, in the card language, e.g. `Illustration spéciale rare`, `SuperRare`.
             */
            rarity?: string | null;
            /**
             * Rarity Code
             * @description Canonical rarity code, shared by every language of one rarity system, e.g. `special_illustration_rare`. Japanese and Chinese Pokémon prints follow their own system (`sar`, `ur`). `null` when the rarity is unknown. Codes of a game: `GET /data/v1/games/{game}/rarities`.
             */
            rarity_code?: string | null;
            /**
             * Language
             * @description Language of the printed card.
             * @enum {string}
             */
            language: "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            edition: components["schemas"]["EditionRef"];
            /** Image Url */
            image_url?: string | null;
            /**
             * Variants
             * @description Price variants tracked for this card: `default` (main printing) and, for games pricing foils separately, `foil`.
             */
            variants: ("default" | "foil" | (string & {}))[];
            /**
             * Cardmarket Product Id
             * @description Cardmarket idProduct; `null` on Sandbox and Starter.
             */
            cardmarket_product_id?: number | null;
            /**
             * US market product id
             * @description US market product id; `null` on Sandbox and Starter.
             */
            tcgplayer_product_id?: number | null;
        };
        /** CompareItem */
        CompareItem: {
            /**
             * Id
             * @description The id as sent.
             */
            id: string;
            /**
             * Status
             * @enum {string}
             */
            status: "ok" | "not_found" | (string & {});
            summary?: components["schemas"]["PriceSummary"] | null;
        };
        /** CompareRequest */
        CompareRequest: {
            /**
             * Ids
             * @description Up to 10 card ids, or sealed product ids prefixed with `sealed:` (e.g. `sealed:1234`).
             */
            ids: (number | string)[];
            /**
             * Include
             * @description Extra card blocks, billed per card.
             */
            include?: ("graded" | "population")[];
        };
        /** CompareResponse */
        CompareResponse: {
            /** Items */
            items: components["schemas"]["CompareItem"][];
        };
        /** ConditionPrice */
        ConditionPrice: {
            /**
             * Condition
             * @enum {string}
             */
            condition: "NM" | "EX" | "GD" | "LP" | "PL" | "PO" | (string & {});
            /**
             * Amount
             * @description Cheapest French-language offer in this condition, in EUR.
             */
            amount: number;
        };
        /** DailyUsage */
        DailyUsage: {
            /**
             * Date
             * Format: date
             */
            date: string;
            /**
             * Credits
             * @description Credits billed that day (UTC).
             */
            credits: number;
            /**
             * Requests
             * @description Metered requests, errors included.
             */
            requests: number;
            /**
             * Errors
             * @description Responses with a status of 400 or more.
             */
            errors: number;
        };
        /** EditionOverview */
        EditionOverview: {
            edition: components["schemas"]["EditionSummary"];
            /**
             * Cards Priced
             * @description Cards of the edition with a recommended price.
             */
            cards_priced: number;
            coverage: components["schemas"]["schemas__analysis__SourceCoverage"];
            /**
             * Chase Cards
             * @description Up to 10 most valuable cards, by recommended price.
             */
            chase_cards: components["schemas"]["PricedCard"][];
            /**
             * Sealed
             * @description Up to 10 sealed products of the edition, most valuable first.
             */
            sealed: components["schemas"]["PricedSealed"][];
        };
        /** EditionRef */
        EditionRef: {
            /**
             * Id
             * @description Edition id, usable as `edition_id` filter.
             */
            id: number;
            /** Name */
            name: string;
            /**
             * Code
             * @description Publisher set code, e.g. `SV06`, `OP-01`.
             */
            code?: string | null;
            /** Release Date */
            release_date?: string | null;
        };
        /** EditionSummary */
        EditionSummary: {
            /**
             * Edition Id
             * @description Edition id, usable as `edition_id` filter on cards and sealed products.
             */
            edition_id: number;
            /** Game */
            game: string;
            /** Name */
            name: string;
            /**
             * Code
             * @description Publisher set code, e.g. `SV06`, `OP-01`.
             */
            code?: string | null;
            /**
             * Language
             * @enum {string}
             */
            language: "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            /**
             * Series
             * @description Series or block of the edition.
             */
            series?: string | null;
            /** Release Date */
            release_date?: string | null;
            /**
             * Card Count
             * @description Cards of this edition available through the API.
             */
            card_count: number;
            /** Logo Url */
            logo_url?: string | null;
            /** Symbol Url */
            symbol_url?: string | null;
        };
        /** ErrorDetail */
        ErrorDetail: {
            /**
             * Code
             * @description Stable snake_case error code, e.g. `card_not_found`, `quota_exceeded`.
             */
            code: string;
            /**
             * Message
             * @description Human readable explanation.
             */
            message: string;
            /**
             * Request Id
             * @description Identifier of the request, also returned in the `X-Request-Id` header.
             */
            request_id: string;
            /**
             * Docs Url
             * @description Documentation of this error code.
             */
            docs_url: string;
        } & {
            [key: string]: unknown;
        };
        /** ErrorResponse */
        ErrorResponse: {
            error: components["schemas"]["ErrorDetail"];
        };
        /** GameInfo */
        GameInfo: {
            /**
             * Slug
             * @description Game slug used by every `game` parameter.
             */
            slug: string;
            /** Name */
            name: string;
            /**
             * Languages
             * @description Card languages available for this game.
             */
            languages: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {}))[];
            /**
             * Coverage
             * @description Per source coverage: cardmarket, us_market, ebay_raw, ebay_graded, gcc (Graded Card Center completed sales, last 90 days), psa_population, pca_population, ccc_population, sealed_cardmarket, sealed_us_market (US market price), sealed_ebay, sealed_gcc (Graded Card Center completed sales, last 90 days), any_price (cards with a current Cardmarket, US market or 30-day eBay price).
             */
            coverage: {
                [key: string]: components["schemas"]["schemas__games__SourceCoverage"];
            };
            /**
             * Editions
             * @description Editions of the game in the catalogue, every language.
             */
            editions: number;
            /**
             * Vision
             * @description Valo.Vision status: `available` once at least one language of the game is open to `POST /vision/v1/scans`. Recognition opens per game/language pair after its qualification; the other pairs answer 403 `vision_not_available`.
             * @enum {string}
             */
            vision: "available" | "unavailable" | (string & {});
            /**
             * Vision Languages
             * @description Languages open to Valo.Vision for this game (public codes, e.g. `["fr"]`); empty when `vision` is `unavailable`. Any other language of the game answers 403 `vision_not_available` on `POST /vision/v1/scans`.
             */
            vision_languages: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {}))[];
        };
        /** GameRarities */
        GameRarities: {
            /**
             * Game
             * @description Game slug.
             */
            game: string;
            /**
             * Rarities
             * @description Every rarity code of the game, by `rank` then `code`.
             */
            rarities: components["schemas"]["RarityInfo"][];
        };
        /** GamesResponse */
        GamesResponse: {
            /** Items */
            items: components["schemas"]["GameInfo"][];
        };
        /** GradedPrices */
        GradedPrices: {
            /**
             * Currency
             * @default EUR
             * @constant
             */
            currency: "EUR" | (string & {});
            /**
             * Collection
             * @default best_effort
             * @constant
             */
            collection: "best_effort" | (string & {});
            /**
             * Quotes
             * @description One quote per company and grade with sales; empty without any.
             */
            quotes: components["schemas"]["GradedQuote"][];
        };
        /** GradedQuote */
        GradedQuote: {
            /**
             * Grader
             * @description Grading company of the sold copies; never mixed with another.
             * @enum {string}
             */
            grader: "psa" | "pca" | "ccc" | "collect_aura" | "bgs" | "cgc" | (string & {});
            /**
             * Grade
             * @description Exact numeric grade; CCC 10 excludes the Gold and Black labels.
             * @enum {integer}
             */
            grade: 9 | 10 | (number & {});
            /**
             * Window Days
             * @description Sales window: 30 days from 4 sales, else 90 days; 365 for the last known value.
             * @enum {integer}
             */
            window_days: 30 | 90 | 365 | (number & {});
            /**
             * Amount
             * @description Sold price in EUR, weighted by volume and recency; `null` unless `status` is `available`.
             */
            amount: number | null;
            /**
             * Sales Count
             * @description Sales behind the quote, in the window.
             */
            sales_count: number;
            /**
             * Status
             * @description `insufficient_sample`: fewer than 3 sales in the window. `stale`: no sale in the last 90 days.
             * @enum {string}
             */
            status: "available" | "stale" | "insufficient_sample" | "missing" | (string & {});
        };
        /** HistoryPoint */
        HistoryPoint: {
            /**
             * Date
             * Format: date
             */
            date: string;
            /** Amount */
            amount: number;
            /**
             * Currency
             * @enum {string}
             */
            currency: "EUR" | "USD" | (string & {});
            /**
             * Metric
             * @enum {string}
             */
            metric: "trend" | "low" | "market" | "sold_median_raw" | (string & {});
            /**
             * Sales Count
             * @description eBay only: sales that day.
             */
            sales_count?: number | null;
            /**
             * Condition
             * @description French Cardmarket listings only: condition of the offer kept that day (best available, NM first, unless the `condition` filter is set).
             */
            condition?: ("NM" | "EX" | "GD" | "LP" | "PL" | "PO" | (string & {})) | null;
        };
        /** IdentifyCandidate */
        IdentifyCandidate: {
            card: components["schemas"]["CardSummary"];
            /**
             * Score
             * @description 0 to 1: number 0.4, name similarity 0.3, edition 0.15, language 0.1, variant 0.05.
             */
            score: number;
            /**
             * Matched On
             * @description Signals of the query the card matched.
             */
            matched_on: ("number" | "name" | "edition" | "language" | "variant" | (string & {}))[];
        };
        /** IdentifyResponse */
        IdentifyResponse: {
            /** Query */
            query: string;
            /**
             * Candidates
             * @description Up to 5 cards, best first; empty when nothing matches.
             */
            candidates: components["schemas"]["IdentifyCandidate"][];
        };
        /** Mover */
        Mover: {
            card: components["schemas"]["CardSummary"];
            recommended: components["schemas"]["RecommendedPrice"];
            /** Change Pct */
            change_pct: number;
            /**
             * Change Source
             * @enum {string}
             */
            change_source: "cardmarket" | "us_market" | "ebay" | (string & {});
        };
        /** OtherLanguage */
        OtherLanguage: {
            /**
             * Card Id
             * @description Card id of this version; `POST /data/v1/cards/batch` returns its sheet and prices.
             */
            card_id: number;
            /**
             * Language
             * @description Language of this version.
             * @enum {string}
             */
            language: "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
        };
        /** Overage */
        Overage: {
            /**
             * Enabled
             * @description Paid overage is not available during the beta.
             * @default false
             */
            enabled: boolean;
        };
        /** Page[CardSummary] */
        Page_CardSummary_: {
            /** Items */
            items: components["schemas"]["CardSummary"][];
            /**
             * Next Cursor
             * @description Opaque cursor for the next page; `null` on the last page.
             */
            next_cursor?: string | null;
        };
        /** Page[EditionSummary] */
        Page_EditionSummary_: {
            /** Items */
            items: components["schemas"]["EditionSummary"][];
            /**
             * Next Cursor
             * @description Opaque cursor for the next page; `null` on the last page.
             */
            next_cursor?: string | null;
        };
        /** Page[SealedSummary] */
        Page_SealedSummary_: {
            /** Items */
            items: components["schemas"]["SealedSummary"][];
            /**
             * Next Cursor
             * @description Opaque cursor for the next page; `null` on the last page.
             */
            next_cursor?: string | null;
        };
        /** PopulationReport */
        PopulationReport: {
            /**
             * Grader
             * @enum {string}
             */
            grader: "psa" | "pca" | "ccc" | (string & {});
            /**
             * Label
             * @description Print specificity, e.g. `1st Edition`, `Holo`.
             */
            label?: string | null;
            /**
             * Grades
             * @description Graded copies per grade, e.g. `{"10": 312, "9.5": 40}`.
             */
            grades: {
                [key: string]: number;
            };
            /** Total */
            total: number;
            /**
             * Observed At
             * Format: date-time
             * @description When the grader report was read.
             */
            observed_at: string;
        };
        /** PriceChange */
        PriceChange: {
            /**
             * Period Days
             * @enum {integer}
             */
            period_days: 7 | 30 | 90 | (number & {});
            /**
             * Change Pct
             * @description Price change over the period in %; `null` without enough data.
             */
            change_pct: number | null;
            /**
             * Source
             * @description Single source of the change: eBay when 4 sales at least in the period, else the US market, else Cardmarket (as the ValoTCG Trending).
             */
            source: ("cardmarket" | "us_market" | "ebay" | (string & {})) | null;
        };
        /** PriceQuote */
        PriceQuote: {
            /**
             * Source
             * @enum {string}
             */
            source: "cardmarket" | "us_market" | "ebay" | (string & {});
            /**
             * Metric
             * @description `trend` and `low` (Cardmarket), `market` (US market, USD), `sold_median_raw` (eBay sold, ungraded).
             * @enum {string}
             */
            metric: "trend" | "low" | "market" | "sold_median_raw" | (string & {});
            /**
             * Amount
             * @description Price in `currency`; `null` whenever `status` is not `available`.
             */
            amount: number | null;
            /**
             * Currency
             * @description Native currency of the source; never converted.
             * @enum {string}
             */
            currency: "EUR" | "USD" | (string & {});
            /**
             * Variant
             * @enum {string}
             */
            variant: "default" | "foil" | (string & {});
            /**
             * Card Language
             * @enum {string}
             */
            card_language: "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            /**
             * Market Language
             * @description Language of the listings behind the price: `global` for Cardmarket prices across all languages, `fr` for French Cardmarket listings, `en` for the US market, the language of the card for eBay sales.
             * @enum {string}
             */
            market_language: "global" | "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            /**
             * Observed At
             * @description Date the source observed this price (not the recompute date).
             */
            observed_at: string | null;
            /**
             * Computed At
             * @description When Valo.Data last recomputed the snapshot.
             */
            computed_at: string | null;
            /**
             * Status
             * @description `stale`: Cardmarket/US market observation older than 48 h (35 days for French Cardmarket listings, collected weekly at best). `insufficient_sample`: fewer than 3 eBay sales in the window. `missing`: no observation.
             * @enum {string}
             */
            status: "available" | "stale" | "insufficient_sample" | "missing" | (string & {});
            /**
             * Reason
             * @description Machine readable cause when not `available`.
             */
            reason?: string | null;
            /**
             * Window Days
             * @description eBay only: sales window in days.
             */
            window_days?: number | null;
            /**
             * Sales Count
             * @description eBay only: sales in the window.
             */
            sales_count?: number | null;
            /**
             * Collection
             * @description eBay only: sales are collected on a best effort basis.
             */
            collection?: ("best_effort" | (string & {})) | null;
            /**
             * Last Collected At
             * @description eBay only: latest sale day collected.
             */
            last_collected_at?: string | null;
            /**
             * Condition
             * @description French Cardmarket listings only: condition of the offer behind `amount`.
             */
            condition?: ("NM" | "EX" | "GD" | "LP" | "PL" | "PO" | (string & {})) | null;
            /**
             * Conditions
             * @description French Cardmarket listings only: cheapest offer per condition in the same scrape, best condition first; `null` whenever `amount` is `null`.
             */
            conditions?: components["schemas"]["ConditionPrice"][] | null;
        };
        /** PriceSummary */
        PriceSummary: {
            /**
             * Type
             * @enum {string}
             */
            type: "card" | "sealed" | (string & {});
            card?: components["schemas"]["CardSummary"] | null;
            sealed?: components["schemas"]["SealedSummary"] | null;
            recommended: components["schemas"]["RecommendedPrice"];
            /**
             * Reliability
             * @description `insufficient_sample`: no source qualifies for a recommended price. `stale`: the retained Cardmarket or US market observation is older than 48 h (35 days for French Cardmarket offers).
             * @enum {string}
             */
            reliability: "ok" | "stale" | "insufficient_sample" | (string & {});
            /**
             * Changes
             * @description Changes over 7, 30 and 90 days.
             */
            changes: components["schemas"]["PriceChange"][];
            /**
             * Prices
             * @description Every source in its native currency, as on /prices.
             */
            prices: components["schemas"]["PriceQuote"][];
            /** @description Cards, with `include=graded`. */
            graded?: components["schemas"]["GradedPrices"] | null;
            /**
             * Population
             * @description Cards, with `include=population`.
             */
            population?: components["schemas"]["PopulationReport"][] | null;
        };
        /** PricedCard */
        PricedCard: {
            card: components["schemas"]["CardSummary"];
            recommended: components["schemas"]["RecommendedPrice"];
        };
        /** PricedSealed */
        PricedSealed: {
            sealed: components["schemas"]["SealedSummary"];
            recommended: components["schemas"]["RecommendedPrice"];
        };
        /** RarityInfo */
        RarityInfo: {
            /**
             * Code
             * @description Canonical rarity code, the `rarity_code` of cards and a value of the `rarity` filter.
             */
            code: string;
            /**
             * Name En
             * @description English name of the rarity.
             */
            name_en: string;
            /**
             * Name Fr
             * @description French name of the rarity.
             */
            name_fr: string;
            /**
             * Rank
             * @description Sort order within the game: lower is more common.
             */
            rank: number;
            /**
             * Languages
             * @description Card languages carrying this code; empty when no card has it yet.
             */
            languages: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {}))[];
            /**
             * Card Count
             * @description Cards of the game carrying this code, all languages.
             */
            card_count: number;
        };
        /** RecommendedPrice */
        RecommendedPrice: {
            /**
             * Amount
             * @description The price the ValoTCG app displays, in EUR; `null` when no source qualifies.
             */
            amount: number | null;
            /**
             * Currency
             * @default EUR
             * @constant
             */
            currency: "EUR" | (string & {});
            /**
             * Source
             * @description `ebay_30d` / `ebay_3m`: median of eBay sales (4 sales at least; 2 for sealed products), `cardmarket`: French offer, then trend, then low, `us_market`: US market price converted to EUR.
             */
            source: ("ebay_30d" | "ebay_3m" | "cardmarket" | "us_market" | (string & {})) | null;
            /**
             * Observed At
             * @description Date the retained source observed this price.
             */
            observed_at: string | null;
            /**
             * Window Days
             * @description eBay only: sales window in days.
             */
            window_days?: number | null;
            /**
             * Sales Count
             * @description eBay only: sales in the window.
             */
            sales_count?: number | null;
            /**
             * Confidence
             * @description Reliability level of this price in the ValoTCG app: sample size, freshness and agreement between sources.
             */
            confidence?: ("high" | "medium" | "low" | (string & {})) | null;
            /**
             * Fx Rate
             * @description US market only: USD→EUR rate applied (ECB).
             */
            fx_rate?: number | null;
            /**
             * Fx Rate Date
             * @description US market only: day of that rate.
             */
            fx_rate_date?: string | null;
        };
        /** RetailPrice */
        RetailPrice: {
            /**
             * Amount
             * @description Launch retail price, in `currency`.
             */
            amount: number;
            /**
             * Currency
             * @description Currency of the product's own market (EUR for French, USD for English, JPY for Japanese), never converted.
             * @enum {string}
             */
            currency: "EUR" | "USD" | "JPY" | (string & {});
            /**
             * Source
             * @description `estimated` from the product type, name and release period; `verified` checked product by product.
             * @enum {string}
             */
            source: "estimated" | "verified" | (string & {});
        };
        /** SealedDetail */
        SealedDetail: {
            /**
             * Sealed Id
             * @description Stable Valo.Data sealed product id (`sealed:{id}` in batches).
             */
            sealed_id: number;
            /** Game */
            game: string;
            /** Name */
            name: string;
            /**
             * Product Type
             * @description e.g. booster, display, etb, starter_deck.
             */
            product_type?: string | null;
            /**
             * Language
             * @enum {string}
             */
            language: "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            edition?: components["schemas"]["EditionRef"] | null;
            /** Release Date */
            release_date?: string | null;
            /** @description Launch retail price (MSRP) on the product's market; `null` when unknown. */
            msrp?: components["schemas"]["RetailPrice"] | null;
            /** Image Url */
            image_url?: string | null;
            /**
             * Slug
             * @description Slug of the product's page on valotcg.com.
             */
            slug: string;
            /**
             * Cardmarket Product Id
             * @description Cardmarket idProduct; `null` on Sandbox and Starter.
             */
            cardmarket_product_id?: number | null;
            /**
             * US market product id
             * @description US market product id; `null` on Sandbox and Starter.
             */
            tcgplayer_product_id?: number | null;
            /**
             * Boosters
             * @description Boosters contained, when known.
             */
            boosters?: number | null;
            /**
             * Cardmarket Url
             * @description Cardmarket product page; `null` on Sandbox and Starter.
             */
            cardmarket_url?: string | null;
            /**
             * US market URL
             * @description US market product page; `null` on Sandbox and Starter.
             */
            tcgplayer_url?: string | null;
        };
        /** SealedPriceHistory */
        SealedPriceHistory: {
            /**
             * Source
             * @enum {string}
             */
            source: "cardmarket" | "us_market" | "ebay" | (string & {});
            /**
             * Variant
             * @enum {string}
             */
            variant: "default" | "foil" | (string & {});
            /**
             * Market Language
             * @description Language of the listings behind the curve, as on current prices: `global` for Cardmarket across all languages, `fr` for French Cardmarket listings (cheapest offer, collected weekly at best), `en` for the US market, the language of the card or sealed product for eBay sales.
             * @enum {string}
             */
            market_language: "global" | "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            /**
             * From
             * Format: date
             */
            from: string;
            /**
             * To
             * Format: date
             */
            to: string;
            /**
             * Points
             * @description One point per observed day; gaps are not interpolated.
             */
            points: components["schemas"]["HistoryPoint"][];
            /** Sealed Id */
            sealed_id: number;
        };
        /** SealedPrices */
        SealedPrices: {
            /** Sealed Id */
            sealed_id: number;
            /** Prices */
            prices: components["schemas"]["PriceQuote"][];
        };
        /** SealedSummary */
        SealedSummary: {
            /**
             * Sealed Id
             * @description Stable Valo.Data sealed product id (`sealed:{id}` in batches).
             */
            sealed_id: number;
            /** Game */
            game: string;
            /** Name */
            name: string;
            /**
             * Product Type
             * @description e.g. booster, display, etb, starter_deck.
             */
            product_type?: string | null;
            /**
             * Language
             * @enum {string}
             */
            language: "fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {});
            edition?: components["schemas"]["EditionRef"] | null;
            /** Release Date */
            release_date?: string | null;
            /** @description Launch retail price (MSRP) on the product's market; `null` when unknown. */
            msrp?: components["schemas"]["RetailPrice"] | null;
            /** Image Url */
            image_url?: string | null;
            /**
             * Slug
             * @description Slug of the product's page on valotcg.com.
             */
            slug: string;
            /**
             * Cardmarket Product Id
             * @description Cardmarket idProduct; `null` on Sandbox and Starter.
             */
            cardmarket_product_id?: number | null;
            /**
             * US market product id
             * @description US market product id; `null` on Sandbox and Starter.
             */
            tcgplayer_product_id?: number | null;
        };
        /** TopMovers */
        TopMovers: {
            /** Game */
            game: string;
            /** Edition Id */
            edition_id?: number | null;
            /** Language */
            language?: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {})) | null;
            /**
             * Period Days
             * @enum {integer}
             */
            period_days: 7 | 30 | 90 | (number & {});
            /**
             * Direction
             * @enum {string}
             */
            direction: "up" | "down" | (string & {});
            /**
             * Reliable
             * @description `true`: only the moves the recommended price backs (`reliable` parameter).
             * @default false
             */
            reliable: boolean;
            /**
             * Items
             * @description Cards of 10 EUR and more, largest change first (Pokémon Base sets aside).
             */
            items: components["schemas"]["Mover"][];
        };
        /** TopPriced */
        TopPriced: {
            /** Game */
            game: string;
            /**
             * Kind
             * @enum {string}
             */
            kind: "card" | "sealed" | (string & {});
            /** Language */
            language?: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt" | (string & {})) | null;
            /** Edition Id */
            edition_id?: number | null;
            /** Product Type */
            product_type?: string | null;
            /**
             * Complete
             * @description `true`: the ranking covers the whole selection. `false`: too many snapshots had a source above their recommended price; the items are the most valuable of the part read.
             */
            complete: boolean;
            /**
             * Items
             * @description Cards (`kind=card`) or sealed products (`kind=sealed`) with a recommended price, most valuable first (ties by id); prices of `low` confidence are left out (an aberrant marketplace offer would top the ranking); fewer than `limit` when fewer are priced.
             */
            items: (components["schemas"]["PricedCard"] | components["schemas"]["PricedSealed"])[];
        };
        /** UsageResponse */
        UsageResponse: {
            /**
             * Product
             * @description `data` (credits), `vision` (scans) or `ia` (questions).
             * @enum {string}
             */
            product: "data" | "vision" | "ia" | (string & {});
            /** Plan Id */
            plan_id: string;
            /**
             * Status
             * @description Subscription status.
             */
            status: string;
            /**
             * Period Start
             * Format: date
             * @description Start of the current monthly credit window (trial: its start).
             */
            period_start: string;
            /**
             * Period End
             * @description End (exclusive) of the current monthly credit window; `null` for the trial.
             */
            period_end: string | null;
            /**
             * Resets At
             * @description When the credits renew; `null` for the trial (never).
             */
            resets_at: string | null;
            /** Credits Included */
            credits_included: number;
            /** Credits Used */
            credits_used: number;
            /** Credits Remaining */
            credits_remaining: number;
            /** Rate Limit Per Minute */
            rate_limit_per_minute: number;
            overage?: components["schemas"]["Overage"];
            /**
             * Daily
             * @description Last 30 days (UTC), oldest first, days without traffic at 0.
             */
            daily: components["schemas"]["DailyUsage"][];
        };
        /** SourceCoverage */
        schemas__analysis__SourceCoverage: {
            /**
             * Cardmarket
             * @description Cards with a Cardmarket price (French offer, trend or low).
             */
            cardmarket: number;
            /**
             * Us Market
             * @description Cards with a US market price.
             */
            us_market: number;
            /**
             * Ebay
             * @description Cards with enough eBay sales (4 in 30 or 90 days) for an eBay price.
             */
            ebay: number;
        };
        /** SourceCoverage */
        schemas__games__SourceCoverage: {
            /**
             * Status
             * @description `available`: values observed within 2 days (Cardmarket, US market), 7 days (eBay, Graded Card Center completed sales) or 8 days (PSA/PCA/CCC population reads). `stale`: values exist but are older. `missing`: no value.
             * @enum {string}
             */
            status: "available" | "stale" | "missing" | (string & {});
            /**
             * Refs Total
             * @description Cards (or sealed products for `sealed_*` sources) of the game.
             */
            refs_total: number;
            /**
             * Refs With Value
             * @description References carrying a value for this source.
             */
            refs_with_value: number;
            /**
             * Latest Observed At
             * @description Most recent observation day.
             */
            latest_observed_at?: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    get_games_data_v1_games_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GamesResponse"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    get_game_rarities_data_v1_games__game__rarities_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Game slug from GET /data/v1/games. */
                game: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GameRarities"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    search_editions_data_v1_editions_get: {
        parameters: {
            query: {
                /** @description Game slug from GET /data/v1/games. */
                game: string;
                /** @description Part of the edition name (accents and case ignored) or of its set code (separators ignored), e.g. `flammes`, `SV06`, `eb05`. */
                q?: string | null;
                language?: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt") | null;
                cursor?: string | null;
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Page_EditionSummary_"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    search_cards_data_v1_cards_get: {
        parameters: {
            query: {
                /** @description Game slug from GET /data/v1/games. */
                game: string;
                /** @description Name (FR/EN) or number. */
                q?: string | null;
                edition_id?: number | null;
                language?: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt") | null;
                /** @description Canonical rarity code from GET /data/v1/games/{game}/rarities (e.g. `holo_rare`, all languages of the system), or the rarity label as printed (case-insensitive). */
                rarity?: string | null;
                cursor?: string | null;
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Page_CardSummary_"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_card_data_v1_cards__card_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                card_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardDetail"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_card_prices_data_v1_cards__card_id__prices_get: {
        parameters: {
            query?: {
                /** @description Comma separated: `graded` (+1 credit, Starter+), `population` (+1, Starter+). */
                include?: string | null;
            };
            header?: never;
            path: {
                card_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardPrices"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    batch_prices_data_v1_cards_batch_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BatchRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BatchResponse"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_card_price_history_data_v1_cards__card_id__price_history_get: {
        parameters: {
            query: {
                source: "cardmarket" | "us_market" | "ebay";
                variant?: "default" | "foil";
                /** @description Defaults to the oldest day allowed. */
                from?: string | null;
                /** @description Defaults to today. */
                to?: string | null;
                /** @description `fr`: cheapest French-language Cardmarket offer of a French card (`source=cardmarket`, `variant=default`). Collected weekly at best: only observed days are returned, each with its condition. */
                market_language?: "fr" | null;
                /** @description With `market_language=fr`: curve of this condition only. Default: best condition of each day. */
                condition?: ("NM" | "EX" | "GD" | "LP" | "PL" | "PO") | null;
            };
            header?: never;
            path: {
                card_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CardPriceHistory"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    search_sealed_data_v1_sealed_get: {
        parameters: {
            query: {
                /** @description Game slug from GET /data/v1/games. */
                game: string;
                /** @description Product name. */
                q?: string | null;
                edition_id?: number | null;
                /** @description e.g. booster, display, etb. */
                product_type?: string | null;
                language?: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt") | null;
                cursor?: string | null;
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Page_SealedSummary_"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_sealed_data_v1_sealed__sealed_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sealed_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SealedDetail"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_sealed_prices_data_v1_sealed__sealed_id__prices_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sealed_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SealedPrices"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_sealed_price_history_data_v1_sealed__sealed_id__price_history_get: {
        parameters: {
            query: {
                source: "cardmarket" | "us_market" | "ebay";
                /** @description Defaults to the oldest day allowed. */
                from?: string | null;
                /** @description Defaults to today. */
                to?: string | null;
            };
            header?: never;
            path: {
                sealed_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SealedPriceHistory"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    identify_data_v1_analysis_identify_get: {
        parameters: {
            query: {
                /** @description Name, number and edition in any order, e.g. "dracaufeu 199 151 fr", "OP05-119 luffy". */
                q: string;
                /** @description Game slug; all games when omitted. */
                game?: string | null;
                /** @description Only cards printed in this language. */
                language?: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt") | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IdentifyResponse"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    card_price_summary_data_v1_analysis_cards__card_id__summary_get: {
        parameters: {
            query?: {
                /** @description Comma separated: `graded` (+1 credit), `population` (+1, Starter+). */
                include?: string | null;
            };
            header?: never;
            path: {
                card_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PriceSummary"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    sealed_price_summary_data_v1_analysis_sealed__sealed_id__summary_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sealed_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PriceSummary"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    compare_prices_data_v1_analysis_compare_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CompareRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CompareResponse"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_top_movers_data_v1_analysis_top_movers_get: {
        parameters: {
            query: {
                /** @description Game slug from GET /data/v1/games. */
                game: string;
                /** @description Period in days: 7, 30 or 90. */
                period?: 7 | 30 | 90;
                /** @description `up`: rises, `down`: falls. */
                direction?: "up" | "down";
                edition_id?: number | null;
                /** @description Only cards printed in this language. */
                language?: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt") | null;
                limit?: number;
                /** @description `true`: only the moves the recommended price backs: that price is not of `low` confidence, the market of the move quotes the card within x2 of it (the US market for English and Japanese prints only), a Cardmarket trend is within x2 of its 30-day average, no other market moved the other way, and a price doubled or halved is measured by two markets. Fewer items when fewer moves qualify. */
                reliable?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TopMovers"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_top_priced_data_v1_analysis_top_priced_get: {
        parameters: {
            query: {
                /** @description Game slug from GET /data/v1/games. */
                game: string;
                /** @description `card`: cards, `sealed`: sealed products. */
                kind: "card" | "sealed";
                /** @description Only items printed in this language. */
                language?: ("fr" | "en" | "ja" | "zh" | "de" | "es" | "it" | "pt") | null;
                edition_id?: number | null;
                /** @description `kind=sealed` only: this product type (booster, display, etb…). */
                product_type?: string | null;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TopPriced"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    read_edition_overview_data_v1_analysis_editions__edition_id__overview_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                edition_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EditionOverview"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `insufficient_scope`, `subscription_inactive`, `plan_feature_unavailable`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `game_not_found`, `card_not_found`, `sealed_not_found`, `edition_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request`, `invalid_cursor`, `range_exceeds_plan` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` (see `Retry-After`), `quota_exceeded`, `key_credit_cap_reached` (key credit cap), `catalog_limit_reached` or `daily_limit_reached` (Sandbox) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `quota_unavailable` */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    get_usage_developer_v1_usage_get: {
        parameters: {
            query?: {
                /** @description `data` (credits), `vision` (scans) or `ia` (questions). */
                product?: "data" | "vision" | "ia";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UsageResponse"];
                };
            };
            /** @description `invalid_api_key`, `api_key_expired` or `not_authenticated` */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `subscription_inactive`, `ip_not_allowed` */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `organization_not_found` */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `invalid_request` */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description `rate_limited` */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
}
