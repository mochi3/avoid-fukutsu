import { assertEquals } from "$std-test/assert/mod.ts";
import * as util from "../../shared/util.ts";
import { KeyPrefix } from "../../shared/types.ts";

Deno.test("createCategoryKey()", () => {
  const actual = util.createCategoryKey();
  const expected = [KeyPrefix.Categories];
  assertEquals(actual, expected);
});

Deno.test("createCategoryKey(id)", () => {
  const actual = util.createCategoryKey(1);
  const expected = [KeyPrefix.Categories, 1];
  assertEquals(actual, expected);
});

Deno.test("createFoodKey()", () => {
  const actual = util.createFoodKey();
  const expected = [KeyPrefix.Foods];
  assertEquals(actual, expected);
});

Deno.test("createFoodKey(id)", () => {
  const actual = util.createFoodKey("a");
  const expected = [KeyPrefix.Foods, "a"];
  assertEquals(actual, expected);
});

Deno.test("createFoodCategoryKey()", () => {
  const actual = util.createFoodCategoryKey(1);
  const expected = [KeyPrefix.FoodsByCategory, 1];
  assertEquals(actual, expected);
});

Deno.test("createFoodCategoryKey(id)", () => {
  const actual = util.createFoodCategoryKey(1, "a");
  const expected = [KeyPrefix.FoodsByCategory, 1, "a"];
  assertEquals(actual, expected);
});

Deno.test("createReviewKey()", () => {
  const actual = util.createReviewKey();
  const expected = [KeyPrefix.Reviews];
  assertEquals(actual, expected);
});

Deno.test("createReviewKey(id)", () => {
  const actual = util.createReviewKey("a");
  const expected = [KeyPrefix.Reviews, "a"];
  assertEquals(actual, expected);
});

Deno.test("createReviewFoodKey()", () => {
  const actual = util.createReviewFoodKey("a");
  const expected = [KeyPrefix.ReviewsByFood, "a"];
  assertEquals(actual, expected);
});

Deno.test("createReviewFoodKey(id)", () => {
  const actual = util.createReviewFoodKey("a", "b");
  const expected = [KeyPrefix.ReviewsByFood, "a", "b"];
  assertEquals(actual, expected);
});
