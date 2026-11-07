import type { ApiResponse, RequestOptions } from "./types.js";

interface Page<Item> {
  items: Item[];
  next_cursor?: string | null;
}

/**
 * Follows `next_cursor` page by page and yields every item.
 * Each page is one billed call; stop iterating (`break`) to stop fetching.
 */
export async function* paginate<Item, Params extends { cursor?: string | null }>(
  fetchPage: (params: Params, options?: RequestOptions) => Promise<ApiResponse<Page<Item>>>,
  params: Params,
  options?: RequestOptions,
): AsyncGenerator<Item, void, undefined> {
  let cursor = params.cursor ?? null;
  do {
    const { data } = await fetchPage({ ...params, cursor }, options);
    yield* data.items;
    cursor = data.next_cursor ?? null;
  } while (cursor !== null);
}
