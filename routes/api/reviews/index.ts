import { Handlers } from "$fresh/server.ts";
import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";

import { Review } from "../../../shared/types.ts";
import { createReviewFoodKey, createReviewKey } from "../../../shared/util.ts";
import { createDataDouble } from "../../../shared/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const res = await req.json()
      .then((data) => createReview(data));
    return Response.json(res);
  },
};

async function createReview(data: Review) {
  let res: Review | string = "";
  try {
    const id = ulid();
    res = await createDataDouble<Review>(
      { ...data, id },
      createReviewKey(id),
      createReviewFoodKey(data.food.id, id),
    );
  } catch (e) {
    console.error(e);
  }
  return res;
}
