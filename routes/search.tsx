import { Handlers, PageProps } from "$fresh/server.ts";

import { Header } from "../components/Header.tsx";

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") ?? "";
    const results = [query];
    return ctx.render({ results, query });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;
  return (
    <div>
      <ul>
        {results.map((food) => <li key={food}>{food}</li>)}
      </ul>
    </div>
  );
}
