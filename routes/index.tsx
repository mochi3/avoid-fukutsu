import { useSignal } from "@preact/signals";
import CategoriesInput from "../islands/CategoriesInput.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Header } from "../components/Header.tsx";

interface numData {
  num: number;
}

export const handler: Handlers<numData> = {
  GET(req, ctx) {
    return ctx.render({ num: 12 });
  },
};

export default function Home(data: PageProps<numData>) {
  const count = useSignal(3);
  const num = data.data.num;
  return (
    <>
      <Header />
      <div class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold mb-5">Try Search</h1>
          <form class="h-16 rounded-md bg-[#efeeec]" action="">
            <input
              type="text"
              name="q"
              placeholder="search food"
              class="bg-transparent w-60 px-3 py-2 leading-loose h-full outline-none"
            />
            <button type="submit" class="bg-[#ffcb57] p-4 h-full rounded-md">
              search
            </button>
          </form>
        </div>
        <CategoriesInput />
      </div>
    </>
  );
}
