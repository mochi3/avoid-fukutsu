export function Card<T extends { name: string }>(
  props: { data: T; url: string },
) {
  const { data, url } = props;
  return (
    <a class="pb-5 pt-3 px-3 border-2 space-y-3 rounded-md" href={url}>
      <h2 class="text-xl font-bold text-center text-grayellow-900">
        {data.name}
      </h2>
      <div class="aspect-3/2 overflow-hidden">
        <img
          class="h-auto"
          src="https://images.pexels.com/photos/5966431/pexels-photo-5966431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        >
        </img>
      </div>
    </a>
  );
}
