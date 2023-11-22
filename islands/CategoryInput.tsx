import { Handlers } from "$fresh/server.ts";
import { useState } from "preact/hooks";

import { Url } from "../shared/types.ts";
import { useInput } from "../shared/custom.ts";

interface PostCategory {
  name: string;
}

export default function CategoryInput() {
  const { set, ...categoryInput } = useInput("");
  const submit = async () => {
    const body: PostCategory = { name: categoryInput.value };
    const res = await fetch(Url.ApiCategories, {
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
          placeholder="カテゴリ名を入力"
          {...categoryInput}
        />
        <button onClick={submit}>作成</button>
      </div>
    </div>
  );
}
