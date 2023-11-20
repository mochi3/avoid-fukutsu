import Smile from "$icons/mood-smile.tsx";

export function Review<T extends { name: string }>(
  props: { data: T },
) {
  const { data } = props;
  return (
    <div class="border-2">
      <div>20日</div>
      <div class="flex">
        <h3 class="">食べれる</h3> <Smile color="red" />
      </div>
      <p>多少色は変わっていましたが、大丈夫でした。</p>
    </div>
  );
}
