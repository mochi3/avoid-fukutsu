import { assertEquals } from "$std-test/assert/mod.ts";
import { createCategoryKey } from "../../shared/util.ts";
import { KeyPrefix } from "../../shared/types.ts";

Deno.test("createCategoryKey() with id", () => {
  const actual = createCategoryKey(1);
  const expected = [KeyPrefix.Categories, 1];
  assertEquals(actual, expected);
});
