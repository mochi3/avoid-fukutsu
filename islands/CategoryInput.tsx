import { Handlers } from "$fresh/server.ts";
import { useState } from "preact/hooks";

import { Url } from "../shared/types.ts";

export default function CategoryInput() {
  const [name, setName] = useState("");
  const submit = async () => {
    const body = `{"name": "${name}"}`;
    const res = await fetch(Url.ApiCategories, {
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
          placeholder="カテゴリ名を入力"
          value={name}
          onChange={(event) =>
            setName((event.target as HTMLInputElement).value)} // hack
        />
        <button onClick={submit}>作成</button>

      </div>
    </div>
  );
}
