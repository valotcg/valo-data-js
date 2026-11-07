// Live smoke test against the production API. Skipped unless VALO_DATA_API_KEY is set.
// It spends a few credits: identify (1) and one card summary.
import { describe, expect, it } from "vitest";
import { ValoData } from "../src/index.js";

const apiKey = process.env.VALO_DATA_API_KEY;

describe.skipIf(!apiKey)("live API", () => {
  it("identifies a card and reads its summary", async () => {
    const client = new ValoData({ apiKey, baseUrl: process.env.VALO_DATA_BASE_URL });
    const games = await client.games.list();
    expect(games.data.items.length).toBeGreaterThan(0);

    const { data, meta } = await client.analysis.identify({ q: "charizard", game: "pokemon" });
    expect(meta.requestId).toMatch(/^req_/);
    const best = data.candidates[0];
    expect(best).toBeDefined();

    const summary = await client.analysis.cardSummary(best!.card.card_id);
    expect(summary.data.type).toBe("card");
    expect(summary.meta.creditsRemaining).not.toBeNull();
  }, 30_000);
});
