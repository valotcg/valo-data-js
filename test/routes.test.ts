import { describe, expect, it } from "vitest";
import * as fx from "./fixtures.js";
import { clientWith, mockFetch, type RecordedCall } from "./mock-fetch.js";

const reply = (body: unknown) => () => ({ body });

function only(calls: RecordedCall[]): RecordedCall {
  expect(calls).toHaveLength(1);
  return calls[0]!;
}

function query(call: RecordedCall): Record<string, string> {
  return Object.fromEntries(call.url.searchParams.entries());
}

describe("routes: URL, method and body of the 20 operations", () => {
  it("GET /data/v1/games", async () => {
    const mock = mockFetch(reply(fx.games));
    const { data } = await clientWith(mock).games.list();
    const call = only(mock.calls);
    expect(call.method).toBe("GET");
    expect(call.url.pathname).toBe("/data/v1/games");
    expect(data.items[0]?.slug).toBe("pokemon");
  });

  it("GET /data/v1/games/{game}/rarities", async () => {
    const mock = mockFetch(reply(fx.rarities));
    const { data } = await clientWith(mock).games.rarities("one piece");
    expect(only(mock.calls).url.pathname).toBe("/data/v1/games/one%20piece/rarities");
    expect(data.rarities[0]?.code).toBe("holo_rare");
  });

  it("GET /data/v1/editions", async () => {
    const mock = mockFetch(reply(fx.editionPage));
    await clientWith(mock).editions.list({ game: "pokemon", q: "151", language: "en", page_size: 20 });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/editions");
    expect(query(call)).toEqual({ game: "pokemon", q: "151", language: "en", page_size: "20" });
  });

  it("GET /data/v1/cards", async () => {
    const mock = mockFetch(reply(fx.cardPage([fx.card()], null)));
    await clientWith(mock).cards.search({ game: "pokemon", q: "pikachu", rarity: "holo_rare", edition_id: 12 });
    const call = only(mock.calls);
    expect(call.method).toBe("GET");
    expect(call.url.pathname).toBe("/data/v1/cards");
    expect(query(call)).toEqual({ game: "pokemon", q: "pikachu", rarity: "holo_rare", edition_id: "12" });
  });

  it("GET /data/v1/cards/{card_id}", async () => {
    const mock = mockFetch(reply(fx.cardDetail));
    const { data } = await clientWith(mock).cards.get(101);
    expect(only(mock.calls).url.pathname).toBe("/data/v1/cards/101");
    expect(data.card_id).toBe(101);
  });

  it("GET /data/v1/cards/{card_id}/prices with include as array", async () => {
    const mock = mockFetch(reply(fx.cardPrices));
    await clientWith(mock).cards.prices(101, { include: ["graded", "population"] });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/cards/101/prices");
    expect(query(call)).toEqual({ include: "graded,population" });
  });

  it("GET /data/v1/cards/{card_id}/prices without include sends no query", async () => {
    const mock = mockFetch(reply(fx.cardPrices));
    await clientWith(mock).cards.prices(101);
    expect(only(mock.calls).url.search).toBe("");
  });

  it("POST /data/v1/cards/batch", async () => {
    const mock = mockFetch(reply(fx.batch));
    const { data } = await clientWith(mock).cards.batch({ ids: [101, "sealed:55"], include: ["graded"] });
    const call = only(mock.calls);
    expect(call.method).toBe("POST");
    expect(call.url.pathname).toBe("/data/v1/cards/batch");
    expect(call.headers.get("content-type")).toBe("application/json");
    expect(call.body).toEqual({ ids: [101, "sealed:55"], include: ["graded"] });
    expect(data.items[0]?.status).toBe("ok");
  });

  it("GET /data/v1/cards/{card_id}/price-history", async () => {
    const mock = mockFetch(reply(fx.cardHistory));
    await clientWith(mock).cards.priceHistory(101, {
      source: "cardmarket",
      variant: "foil",
      from: "2026-10-01",
      to: "2026-11-01",
      market_language: "fr",
      condition: "NM",
    });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/cards/101/price-history");
    expect(query(call)).toEqual({
      source: "cardmarket",
      variant: "foil",
      from: "2026-10-01",
      to: "2026-11-01",
      market_language: "fr",
      condition: "NM",
    });
  });

  it("GET /data/v1/sealed", async () => {
    const mock = mockFetch(reply(fx.sealedPage([fx.sealedProduct()], null)));
    await clientWith(mock).sealed.search({ game: "pokemon", product_type: "display", language: "fr" });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/sealed");
    expect(query(call)).toEqual({ game: "pokemon", product_type: "display", language: "fr" });
  });

  it("GET /data/v1/sealed/{sealed_id}", async () => {
    const mock = mockFetch(reply(fx.sealedDetail));
    await clientWith(mock).sealed.get(55);
    expect(only(mock.calls).url.pathname).toBe("/data/v1/sealed/55");
  });

  it("GET /data/v1/sealed/{sealed_id}/prices", async () => {
    const mock = mockFetch(reply(fx.sealedPrices));
    await clientWith(mock).sealed.prices(55);
    expect(only(mock.calls).url.pathname).toBe("/data/v1/sealed/55/prices");
  });

  it("GET /data/v1/sealed/{sealed_id}/price-history", async () => {
    const mock = mockFetch(reply(fx.sealedHistory));
    await clientWith(mock).sealed.priceHistory(55, { source: "us_market", from: "2026-10-01" });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/sealed/55/price-history");
    expect(query(call)).toEqual({ source: "us_market", from: "2026-10-01" });
  });

  it("GET /data/v1/analysis/identify", async () => {
    const mock = mockFetch(reply(fx.identify));
    const { data } = await clientWith(mock).analysis.identify({ q: "charizard 199 151", game: "pokemon", language: "en" });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/analysis/identify");
    expect(query(call)).toEqual({ q: "charizard 199 151", game: "pokemon", language: "en" });
    expect(data.candidates[0]?.card.card_id).toBe(101);
  });

  it("GET /data/v1/analysis/cards/{card_id}/summary", async () => {
    const mock = mockFetch(reply(fx.summary));
    const { data } = await clientWith(mock).analysis.cardSummary(101, { include: "graded" });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/analysis/cards/101/summary");
    expect(query(call)).toEqual({ include: "graded" });
    expect(data.recommended.amount).toBe(118);
  });

  it("GET /data/v1/analysis/sealed/{sealed_id}/summary", async () => {
    const mock = mockFetch(reply({ ...fx.summary, type: "sealed", card: null, sealed: fx.sealedProduct() }));
    await clientWith(mock).analysis.sealedSummary(55);
    expect(only(mock.calls).url.pathname).toBe("/data/v1/analysis/sealed/55/summary");
  });

  it("POST /data/v1/analysis/compare", async () => {
    const mock = mockFetch(reply(fx.compare));
    await clientWith(mock).analysis.compare({ ids: [101, 102, "sealed:55"] });
    const call = only(mock.calls);
    expect(call.method).toBe("POST");
    expect(call.url.pathname).toBe("/data/v1/analysis/compare");
    expect(call.body).toEqual({ ids: [101, 102, "sealed:55"] });
  });

  it("GET /data/v1/analysis/top-movers", async () => {
    const mock = mockFetch(reply(fx.topMovers));
    await clientWith(mock).analysis.topMovers({ game: "pokemon", period: 7, direction: "down", reliable: true, limit: 5 });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/analysis/top-movers");
    expect(query(call)).toEqual({ game: "pokemon", period: "7", direction: "down", reliable: "true", limit: "5" });
  });

  it("GET /data/v1/analysis/top-priced", async () => {
    const mock = mockFetch(reply(fx.topPriced));
    await clientWith(mock).analysis.topPriced({ game: "pokemon", kind: "sealed", product_type: "display" });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/data/v1/analysis/top-priced");
    expect(query(call)).toEqual({ game: "pokemon", kind: "sealed", product_type: "display" });
  });

  it("GET /data/v1/analysis/editions/{edition_id}/overview", async () => {
    const mock = mockFetch(reply(fx.overview));
    const { data } = await clientWith(mock).analysis.editionOverview(12);
    expect(only(mock.calls).url.pathname).toBe("/data/v1/analysis/editions/12/overview");
    expect(data.cards_priced).toBe(200);
  });

  it("GET /developer/v1/usage", async () => {
    const mock = mockFetch(reply(fx.usage));
    const { data } = await clientWith(mock).usage({ product: "data" });
    const call = only(mock.calls);
    expect(call.url.pathname).toBe("/developer/v1/usage");
    expect(query(call)).toEqual({ product: "data" });
    expect(data.credits_remaining).toBe(488);
  });

  it("drops null and undefined query values", async () => {
    const mock = mockFetch(reply(fx.cardPage([], null)));
    await clientWith(mock).cards.search({ game: "pokemon", q: null, language: undefined });
    expect(query(only(mock.calls))).toEqual({ game: "pokemon" });
  });
});
