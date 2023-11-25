import { Handlers, PageProps } from "$fresh/server.ts";

import { Header } from "../../components/Header.tsx";
import { Card } from "../../components/Card.tsx";
import {
  Category,
  Food,
  KeyPrefix,
  Url,
} from "../../shared/types.ts";
import { createCategoryKey } from "../../shared/util.ts";

import { get, getList } from "../../shared/db.ts";

export const handler: Handlers<{ category: Category; foods: Food[] }> = {
  async GET(_req, ctx) {
    const categoryId = parseInt(ctx.params.id);
    const category = await get<Category>(
      createCategoryKey(categoryId),
    );
    const foods = await getList<Food>([KeyPrefix.FoodsByCategory, categoryId]);
    return ctx.render({ category, foods });
  },
};

export default function CategoryPage(
  { data }: PageProps<{ category: Category; foods: Food[] }>,
) {
  const { category, foods } = data;
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto py-8">
        <h1 class="text-2xl font-bold mb-5 text-grayellow-700">
          {category.name}
        </h1>
        <div class="grid grid-cols-3 gap-5 lg:!grid-cols-4 lg:!gap-5">
          {foods.map((food) => (
            <Card data={food} url={`${Url.Food}/${food.id}`} />
          ))}
        </div>
      </div>
    </>
  );
}
