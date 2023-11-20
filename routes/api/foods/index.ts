import { Handlers } from "$fresh/server.ts";
import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";

import { Category, Food, createFoodKey, createFoodCategoryKey, createCategoryKey } from "../../../shared/types.ts";
import { createDataDouble, get } from "../../../shared/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const res = await req.json()
      .then((data) => createFood(data.name, parseInt(data.categoryId)));
    return Response.json(res);
  },
};

async function createFood(name: string, categoryId: number) {
  let res: Food | string = "";
  try {
    const {value: category} = await get<Category>(createCategoryKey(categoryId));
    const id = ulid();
    res = await createDataDouble<Food>(
      { id, name, categoryId: category.id, categoryName: category.name },
      createFoodKey(id),
      createFoodCategoryKey(category.id, id),
    );
  } catch (e) {
    console.error(e);
  }
  return res;
}
