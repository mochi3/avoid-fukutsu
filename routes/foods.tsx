import CategoriesInput from "../islands/CategoryInput.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Header } from "../components/Header.tsx";
import { Table } from "../components/Table.tsx";
import { Category, Food, Url } from "../shared/types.ts";
import { getAllList } from "../shared/db.ts";
import { KeyPrefix } from "../shared/types.ts";
import FoodInput from "../islands/FoodInput.tsx";

export const handler: Handlers<{ categories: Category[]; foods: Food[] }> = {
  async GET(_req, ctx) {
    const categories = await getAllList<Category>(KeyPrefix.Categories);
    const foods = await getAllList<Food>(KeyPrefix.Foods);
    return ctx.render({ categories, foods });
  },
};

export default function FoodsPage(
  {data}: PageProps<{ categories: Category[]; foods: Food[] }>,
) {
  const tablekeys = ["id", "name", "categoryName"];
  const { categories, foods } = data;
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto">
        <Table keys={tablekeys} objs={foods} deleteUrl={Url.ApiFoods} deleteId="id" />
        <FoodInput categories={categories} />
      </div>
    </>
  );
}
