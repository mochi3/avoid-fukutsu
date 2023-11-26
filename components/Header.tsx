import { Url } from "../shared/types.ts";

export function Header() {
  return (
    <>
      <div class="flex items-center justify-between px-6 py-2 bg-orange-200 fixed w-screen top-0">
        <div>
          <a
            class="px-4 py-2 border-solid rounded-md font-bold text-grayellow-900"
            href="/"
          >
            top
          </a>
          <a
            class="px-4 py-2 border-solid rounded-md font-bold text-grayellow-900"
            href={Url.Categories}
          >
            categories
          </a>
          <a
            class="px-4 py-2 border-solid rounded-md font-bold text-grayellow-900"
            href={Url.Foods}
          >
            foods
          </a>
          <a
            class="px-4 py-2 border-solid rounded-md font-bold text-grayellow-900"
            href={Url.Reviews}
          >
            reviews
          </a>
        </div>
        <div>
          <button class="px-4 py-2 border-solid rounded-md font-bold text-grayellow-900">
            login
          </button>
        </div>
      </div>
    </>
  );
}
