import { Handlers, PageProps } from "$fresh/server.ts";

import { Food } from "../../shared/types.ts";
import { Header } from "../../components/Header.tsx";
import { ReviewCard } from "../../components/ReviewCard.tsx";
import { Review } from "../../shared/types.ts";
import { createFoodKey, createReviewFoodKey } from "../../shared/util.ts";
import { get, getList } from "../../shared/db.ts";

export const handler: Handlers<{food: Food, reviews: Review[]}> = {
  async GET(_req, ctx) {
    const foodId = ctx.params.id;
    const food = await get<Food>(createFoodKey(foodId));
    const reviews = await getList<Review>(createReviewFoodKey(foodId));
    return ctx.render({food, reviews});
  },
};

export default function FoodPage({ data }: PageProps<{food: Food, reviews: Review[]}>) {
  const {food, reviews} = data;
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto py-8">
        <h1 class="text-2xl font-bold mb-5 text-grayellow-700">
          {food.name}
        </h1>
        <div class="grid grid-cols-3 gap-5 lg:!grid-cols-4 lg:!gap-5">
          {reviews.map(review => <ReviewCard review={review} />)}
        </div>
      </div>
    </>
  );
}
