import IconGitHub from "$icons/brand-github.tsx";

export function Footer() {
  return (
    <>
      <div class=" items-center flex first-line:justify-end px-6 pt-12 pb-8 space-x-3 absolute bottom-0 w-screen">
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge-dark.svg"
            alt="Made with Fresh"
          />
        </a>
        <IconGitHub />
      </div>
    </>
  );
}
