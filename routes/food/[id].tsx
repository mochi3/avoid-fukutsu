import { Handlers, PageProps } from "$fresh/server.ts";

import { Food } from "../../shared/types.ts";
import { Header } from "../../components/Header.tsx";
import { Review } from "../../components/Review.tsx";
import { createFoodKey } from "../../shared/types.ts";
import { get } from "../../shared/db.ts";

export const handler: Handlers<Food> = {
  async GET(_req, ctx) {
    const foodId = ctx.params.id;
    const {value: food} = await get<Food>(createFoodKey(foodId));
    return ctx.render(food);
  },
};

export default function FoodPage({ data }: PageProps<Food>) {
  const food = data;
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto py-8">
        <h1 class="text-2xl font-bold mb-5 text-grayellow-700">
          {food.name}
        </h1>
        <div class="grid grid-cols-3 gap-5 lg:!grid-cols-4 lg:!gap-5">
          <Review data={food} />
        </div>
      </div>
    </>
  );
}
