import { useSignal } from "@preact/signals";
import CategoriesInput from "../islands/CategoriesInput.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Category } from "../shared/types.ts";

export default function CategoriesList(props: { categories: Category[] }) {
  const deleteCategory = async (id: number) => {
    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });
  };
  const list = props.categories.map((category) => {
    const { id, name } = category;
    return (
      <li class="flex">
        <div>{id}</div>
        <div>{name}</div>
        <button onClick={() => deleteCategory(id)}>削除</button>
      </li>
    );
  });
  const table = (header: string[], body: Category[]) => {
    const innerBody = (b: Category) => {
      return (
        <tr>
          {Object.values(b).map((name) => <td>{name}</td>)}
          <td>
            <button>削除</button>
          </td>
        </tr>
      );
    };
    return (
      <table>
        <thead>
          <tr>
            {header.map((name) => <th>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {body.map((b) => innerBody(b))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      {table(["ID", "category"], props.categories)}
    </>
  );
}
