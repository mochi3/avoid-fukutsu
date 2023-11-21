import { Handlers, PageProps } from "$fresh/server.ts";
import Search from "$icons/search.tsx"

import { Header } from "../components/Header.tsx";
import { Card } from "../components/Card.tsx";
import CreateReview from "../islands/CreateReview.tsx";
import { Category, Food, KeyPrefix, Url } from "../shared/types.ts";
import { getList } from "../shared/db.ts";

export const handler: Handlers<{categories:Category[], foods: Food[]}> = {
  async GET(req, ctx) {
    const categories = await getList<Category>([KeyPrefix.Categories]);
    const foods = await getList<Food>([KeyPrefix.Foods]);
    return ctx.render({categories, foods});
  },
};

export default function Home({ data }: PageProps<{categories:Category[], foods: Food[]}>) {
  const { categories, foods} = data;
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto space-y-20 pb-10 pt-20">
        <section class="grid grid-cols-2">
          <div class="flex flex-col items-start justify-center space-y-10">
            <h1 class="text-5xl font-bold text-grayellow-900">
              Try Search
            </h1>
            <form class="h-16 rounded-md text-lg flex" action="">
              <input
                type="text"
                name="q"
                placeholder="Search food"
                class="w-60 px-5 py-3 leading-loose outline-none bg-grayellow-200 rounded-l-md"
              />
              <button
                type="submit"
                class="bg-orange-400 px-6 rounded-r-md text-white"
              >
                <Search />
              </button>
            </form>
          </div>
          <div class="flex justify-end items-center">
            <CreateReview foods={foods} />
          </div>
        </section>
        <section class="space-y-6">
          <h1 class="text-3xl font-bold text-grayellow-600">Categories</h1>
          <div class="grid grid-cols-3 gap-5 lg:!grid-cols-4 lg:!gap-5">
            {categories.map((category) => (
              <Card data={category} url={`${Url.Category}/${category.id}`} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
