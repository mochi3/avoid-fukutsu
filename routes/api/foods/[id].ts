import { Handlers } from "$fresh/server.ts";

import { deleteDataDouble } from "../../../shared/db.ts";
import { createFoodKey, createFoodCategoryKey } from "../../../shared/types.ts";

export const handler: Handlers = {
  async DELETE(_req, ctx) {
    const id = ctx.params.id;
    let message = "";
    try {
      // fix
      message = await deleteDataDouble(createFoodKey(id), createFoodCategoryKey(1));
    } catch (e) {
      console.error(e);
    }
    return new Response(message);
  },
};
