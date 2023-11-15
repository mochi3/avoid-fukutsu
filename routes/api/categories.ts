import { Handlers } from "$fresh/server.ts";


import { Category, CategoryKey } from "../../shared/types.ts";
import { updateDb, getList } from "../../shared/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const data = await req.json();
    console.log(data.categoryName);
    const res = setCategory(data.categoryName);
    return Response.json(res);
  },
  async GET(_req) {
    const res = await getAllCategory();
    console.log(res);
    return Response.json(res);
  }
};


async function getAllCategory() {
  let res: string[] = [];
  try {
    res = await getList(CategoryKey.Primary1);
  } catch(e) {
    console.log(e.message);
  }
  return res;
}

async function setCategory(name: string) {
  const category: Category = {
    id: 2,
    name: name,
  }
  const keyPrimary = [CategoryKey.Primary1, category[CategoryKey.Primary2Property]];
  try {
    await updateDb(category, keyPrimary);
  } catch(e) {
    console.log(e.message);
  }
  return category;
}
