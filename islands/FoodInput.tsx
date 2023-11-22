import { Handlers } from "$fresh/server.ts";
import { useState } from "preact/hooks";

import { Category } from "../shared/types.ts";
import { Url } from "../shared/types.ts";
import { useInput } from "../shared/custom.ts";

interface PostFood {
  name: string;
  categoryId: number;
}

export default function FoodInput(props: { categories: Category[] }) {
  const { categories } = props;
  const { set: a, ...foodInput } = useInput("");
  const { set: b, ...categoryInput } = useInput(0);
  const submit = async () => {
    const body: PostFood = {
      name: foodInput.value,
      categoryId: categoryInput.value,
    };
    const res = await fetch(Url.ApiFoods, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
          {...foodInput}
        />
        <select class="outline-none" onChange={categoryInput.onChange}>
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
