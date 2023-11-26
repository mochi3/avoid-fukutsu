import { Handlers } from "$fresh/server.ts";

import { deleteDataDouble, get } from "../../../shared/db.ts";
import { Review } from "../../../shared/types.ts";
import { createReviewFoodKey, createReviewKey } from "../../../shared/util.ts";

export const handler: Handlers = {
  async DELETE(_req, ctx) {
    const id = ctx.params.id;
    let message = "";
    try {
      // fix
      message = await deleteReviewById(id);
    } catch (e) {
      console.error(e);
    }
    return new Response(message);
  },
};

export const deleteReviewById = async (reviewId: string) => {
  const { food: { id: foodId } } = await get<Review>(createReviewKey(reviewId));
  return deleteDataDouble(
    createReviewKey(reviewId),
    createReviewFoodKey(foodId, reviewId),
  );
};
