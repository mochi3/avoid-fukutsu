import { Handlers } from "$fresh/server.ts";

import { deleteData } from "../../../shared/db.ts";
import { createCategoryKey } from "../../../shared/types.ts";

export const handler: Handlers = {
  async DELETE(_req, ctx) {
    const id = ctx.params.id;
    let message = "";
    console.log(id);
    try {
      message = await deleteData(createCategoryKey(parseInt(id)));
    } catch (e) {
      console.error(e);
    }
    return new Response(message);
  },
};
