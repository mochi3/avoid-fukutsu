import CategoriesInput from "../islands/CategoryInput.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Header } from "../components/Header.tsx";
import { Table } from "../components/Table.tsx";
import { Food, KeyPrefix, ListReview, Review, Url } from "../shared/types.ts";
import { createFoodKey, createReviewKey } from "../shared/util.ts";
import { getList } from "../shared/db.ts";
import FoodInput from "../islands/FoodInput.tsx";

export const handler: Handlers<{ foods: Food[]; reviews: Review[] }> = {
  async GET(_req, ctx) {
    const foods = await getList<Food>(createFoodKey());
    const reviews = await getList<Review>(createReviewKey());
    return ctx.render({ foods, reviews });
  },
};

export default function FoodsPage(
  { data }: PageProps<{ foods: Food[]; reviews: Review[] }>,
) {
  const tableKeys = ["id", "message"];
  const { foods, reviews } = data;
  const listReviews: ListReview[] = reviews.map((review) => ({
    id: review.id,
    foodName: review.food.name,
    message: review.message,
  } as ListReview));
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto pt-10">
        <Table
          keys={tableKeys}
          objs={listReviews}
          deleteUrl={Url.ApiReviews}
          deleteId="id"
        />
      </div>
    </>
  );
}
