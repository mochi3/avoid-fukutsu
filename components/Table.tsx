import { Category } from "../shared/types.ts";
import DeleteButton from "../islands/DeleteButton.tsx";

export function Table(
  props: { header: string[]; body: Category[]; deleteUrl?: string },
) {
  const { header, body, deleteUrl } = props;
  const innerBody = (category: Category) => {
    return (
      <tr class="border-b border-gray-300 last:border-none">
        {Object.values(category).map((name) => <td class="px-6 py-3">{name}
        </td>)}
        {renderDeleteButton(category.id)}
      </tr>
    );
  };
  const renderDeleteButton = (id: number) => {
    return deleteUrl
      ? (
        <td class="px-2 text-center">
          <DeleteButton deleteUrl={deleteUrl} id={id} />
        </td>
      )
      : <></>;
  };
  const renderDeleteButtonHeader = () => {
    return deleteUrl ? <th></th> : <></>;
  };
  return (
    <table class="mx-auto mt-10 w-full">
      <thead class="bg-gray-300 uppercase text-left">
        <tr>
          {header.map((name) => <th class="px-6 py-3">{name}</th>)}
          {renderDeleteButtonHeader()}
        </tr>
      </thead>
      <tbody class="bg-gray-100">
        {body.map((b) => innerBody(b))}
      </tbody>
    </table>
  );
}
