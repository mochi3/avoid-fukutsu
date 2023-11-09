import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

import { Header } from "../components/Header.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <Header />
      <div class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold mb-5">Try Search</h1>
          <form class="h-16 rounded-md bg-[#e3e2de]">
            <input type="text" placeholder="search food" class="bg-transparent w-60 px-3 py-2 leading-loose h-full"></input>
            <button type="submit" class="bg-[#ffcb57] p-4 h-full rounded-md">search</button>
          </form>
        </div>
      </div>
    </>
  );
}
