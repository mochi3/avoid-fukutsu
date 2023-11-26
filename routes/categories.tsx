import CategoryInput from "../islands/CategoryInput.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Header } from "../components/Header.tsx";
import { Table } from "../components/Table.tsx";
import { Category, Url } from "../shared/types.ts";
import { getList } from "../shared/db.ts";
import { KeyPrefix } from "../shared/types.ts";

export const handler: Handlers<Category[]> = {
  async GET(_req, ctx) {
    const res = await getList<Category>([KeyPrefix.Categories]);
    return ctx.render(res);
  },
};

export default function CategoriesPage({ data = [] }: PageProps<Category[]>) {
  const tableKeys = ["id", "name"];
  return (
    <>
      <Header />
      <div class="max-w-screen-md mx-auto pt-10">
        <Table
          keys={tableKeys}
          objs={data}
          deleteUrl={Url.ApiCategories}
          deleteId="id"
        />
        <CategoryInput />
      </div>
    </>
  );
}
