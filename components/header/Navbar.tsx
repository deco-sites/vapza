import Buttons from "$store/islands/HeaderButton.tsx";
import { navbarHeight } from "./constants.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

export interface INavItem {
  label: string;
  href: string;
}

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div class="lg:hidden flex flex-col items-center shadow-header w-full px-4 gap-2">
        <div class="flex w-full items-center justify-between">
          <Buttons variant="menu" />
          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image src={logo.src} alt={logo.alt} width={85} height={50} />
            </a>
          )}
          <div class="flex gap-1">
            <Buttons variant="cart" />
          </div>
        </div>
        <Buttons variant="search" />
      </div>
    </>
  );
}

export default Navbar;
