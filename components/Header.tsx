export function Header() {
  return (
    <>
      <div class="flex items-center justify-between px-6 py-2 bg-orange-200">
        <div>
          <a class="px-4 py-2 border-solid rounded-md font-bold text-grayellow-900" href="/">
            top
          </a>
          <a class="px-4 py-2 border-solid rounded-md font-bold text-grayellow-900" href="/categories">
            categories
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
