import { Handlers } from "$fresh/server.ts";
import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";

import { Food, Review, PostReview } from "../../../shared/types.ts";
import { createFoodKey, createReviewKey, createReviewFoodKey } from "../../../shared/util.ts";
import { createDataDouble, get } from "../../../shared/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const res = await req.json()
      .then((data) => createReview(data));
    return Response.json(res);
  },
};

async function createReview(data: PostReview) {
  let res: Review | string = "";
  try {
    const food = await get<Food>(createFoodKey(data.foodId));
    const id = ulid();
    res = await createDataDouble<Review>(
      { id, food, ...data },
      createReviewKey(id),
      createReviewFoodKey(food.id, id),
    );
  } catch (e) {
    console.error(e);
  }
  return res;
}

