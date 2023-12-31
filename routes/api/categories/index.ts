import { Handlers } from "$fresh/server.ts";

import { Category, KeyPrefix } from "../../../shared/types.ts";
import { createCategoryKey } from "../../../shared/util.ts";
import { createData, getLast } from "../../../shared/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const res = await req.json()
      .then((data) => createCategory(data.name));
    return Response.json(res);
  },
};

async function createCategory(name: string) {
  let res: Category | undefined;
  try {
    res = await getLast<Category>(KeyPrefix.Categories)
      .then((last) => {
        const id = last.id + 1;
        return createData<Category>(
          { id, name },
          createCategoryKey(id),
        );
      });
  } catch (e) {
    console.error(e);
  }
  return res;
}
