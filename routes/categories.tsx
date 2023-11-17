import { useSignal } from "@preact/signals";
import CategoriesInput from "../islands/CategoriesInput.tsx";
import CategoriesList from "../islands/CategoriesList.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Header } from "../components/Header.tsx";
import { Category } from "../shared/types.ts";
import { getAllList } from "../shared/db.ts";
import { KeyPrefix } from "../shared/types.ts";

export const handler: Handlers<Category[]> = {
  async GET(_req, ctx) {
    const res = await getAllList<Category>(KeyPrefix.Categories);
    return ctx.render(res);
  },
};


export default function CategoriesPage({ data }: PageProps<Category[]>) {
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto">
        <CategoriesList categories={data} />
        <CategoriesInput />
      </div>
    </>
  );
}
