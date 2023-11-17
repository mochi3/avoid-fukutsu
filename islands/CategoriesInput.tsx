import { Handlers } from "$fresh/server.ts";
import { useState } from "preact/hooks";

export default function CategoriesInput() {
  const [categoryName, setCategoryName] = useState("");
  const sendCategories = async () => {
    const body = `{"categoryName": "${categoryName}"}`;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  return (
    <div>
      <div class="mt-5">
        <input
          type="text"
          placeholder="カテゴリ名を入力"
          value={categoryName}
          onChange={(event) =>
            setCategoryName((event.target as HTMLInputElement).value)} //古い可能性あり
        />
        <button onClick={sendCategories}>作成</button>

      </div>
    </div>
  );
}
