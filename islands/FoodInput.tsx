import { Handlers } from "$fresh/server.ts";
import { useState } from "preact/hooks";

import { Category } from "../shared/types.ts";
import { Url } from "../shared/types.ts";

export default function FoodInput(props: { categories: Category[] }) {
  const { categories } = props;
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const submit = async () => {
    const body = JSON.stringify({name, categoryId});
    const res = await fetch(Url.ApiFoods, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    window.location.reload(); // hack
  };

  return (
    <div>
      <div class="mt-5">
        <input
          class="bg-transparent w-60 px-6 py-3 leading-loose h-full outline-none"
          type="text"
          placeholder="食べ物名を入力"
          value={name}
          onChange={(e) =>
            setName((e.target as HTMLInputElement).value)} // hack
        />
        <select class="outline-none" onChange={(event) =>
            setCategoryId((event.target as HTMLSelectElement).value)}>
          <option value="">カテゴリを選ぶ</option>
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
        <button onClick={submit}>作成</button>
      </div>
    </div>
  );
}
