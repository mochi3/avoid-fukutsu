import { TableList } from "../shared/types.ts";
import DeleteButton from "../islands/DeleteButton.tsx";

export function Table<T extends TableList>(
  props: {
    keys: (keyof T)[];
    objs: T[];
    deleteUrl?: string;
    deleteId?: keyof T;
  },
) {
  const { keys, objs, deleteUrl, deleteId } = props;
  const innerBody = (obj: T) => {
    return (
      <tr class="border-b border-gray-300 last:border-none">
        {keys.map((key) => <td class="px-6 py-3">{obj[key].toString()}</td>)}
        {renderDeleteButton(obj)}
      </tr>
    );
  };
  const renderDeleteButton = (obj: T) => {
    return deleteUrl && deleteId
      ? (
        <td class="px-4 text-center">
          <DeleteButton deleteUrl={deleteUrl} id={obj[deleteId]} />
        </td>
      )
      : <></>;
  };
  const renderDeleteButtonHeader = () => {
    return deleteUrl && deleteId ? <th></th> : <></>;
  };
  return (
    <table class="mx-auto mt-10 w-full">
      <thead class="bg-gray-300 uppercase text-left">
        <tr>
          {keys.map((key) => <th class="px-6 py-3">{key.toString()}</th>)}
          {renderDeleteButtonHeader()}
        </tr>
      </thead>
      <tbody class="bg-gray-100">
        {objs.map((obj) => innerBody(obj))}
      </tbody>
    </table>
  );
}
