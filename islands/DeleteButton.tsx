import Trash from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/trash.tsx"

export default function DeleteButton(props: {deleteUrl: string, id: unknown}) {
  const {deleteUrl, id} = props;
  const sendDelete = async () => {
    await fetch(`${deleteUrl}/${id}`, {
      method: "DELETE",
    });
    window.location.reload(); // hack
  };
  return (
    <button onClick={() => sendDelete()} class="text-blue-600">
      <Trash />
    </button>
  )
}