import { Handlers, PageProps } from "$fresh/server.ts";

import { Header } from "../components/Header.tsx";
import { Card } from "../components/Card.tsx";
import { Category, KeyPrefix } from "../shared/types.ts";
import { getAllList } from "../shared/db.ts";

export const handler: Handlers<Category[]> = {
  async GET(req, ctx) {
    const res = await getAllList<Category>(KeyPrefix.Categories);
    return ctx.render(res);
  },
};

export default function Home({ data }: PageProps<Category[]>) {
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto space-y-8 pb-10">
        <section class="px-4 py-8 mx-auto">
          <div class="flex flex-col items-center justify-center">
            <img
              class="my-6"
              src="/logo.svg"
              width="128"
              height="128"
              alt="the Fresh logo: a sliced lemon dripping with juice"
            />
            <h1 class="text-4xl font-bold mb-5 text-grayellow-900">
              Try Search
            </h1>
            <form class="h-16 rounded-md" action="">
              <input
                type="text"
                name="q"
                placeholder="search food"
                class="w-60 px-3 py-2 leading-loose h-full outline-none bg-grayellow-100 rounded-l-md"
              />
              <button
                type="submit"
                class="bg-orange-400 p-4 h-full rounded-r-md text-grayellow-900"
              >
                search
              </button>
            </form>
          </div>
        </section>
        <section class="space-y-6">
          <h1 class="text-4xl font-bold text-grayellow-900">Categories</h1>
          <div class="grid grid-cols-3 gap-5 lg:!grid-cols-4 lg:!gap-5">
            {data.map((category) => <Card name={category.name} />)}
          </div>
        </section>
      </div>
    </>
  );
}
