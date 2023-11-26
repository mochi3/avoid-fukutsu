import { Handlers } from "$fresh/server.ts";

import { deleteDataDouble, get } from "../../../shared/db.ts";
import { Food } from "../../../shared/types.ts";
import { createFoodCategoryKey, createFoodKey } from "../../../shared/util.ts";

export const handler: Handlers = {
  async DELETE(_req, ctx) {
    const id = ctx.params.id;
    let message = "";
    try {
      // fix
      message = await deleteFoodById(id);
    } catch (e) {
      console.error(e);
    }
    return new Response(message);
  },
};

export const deleteFoodById = async (foodId: string) => {
  const { categoryId } = await get<Food>(createFoodKey(foodId));
  return deleteDataDouble(
    createFoodKey(foodId),
    createFoodCategoryKey(categoryId, foodId),
  );
};
