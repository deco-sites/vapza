import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";

import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface IconItem {
  label:
    // | "Grid"
    // | "ToqueFinal"
    // | "SoAquecer"
    // | "Organico"
    // | "Single"
    | "PratosProntos";
    // | "Kits";
}
export interface NavItem {
  icon: IconItem;
  label: string;
  href: string;
}
export interface Props {
  /** @title Logo */
  logo?: { src: Image; alt: string };

  
  /**
   * @title Navigation items
   * @description Navigation items used on mobile
   */
  navItems?: NavItem[];

  navItemsBottom?: NavItem[];
/** @title Search Bar */
  searchbar?: SearchbarProps;
  
}

function Header({
  searchbar: _searchbar,
  navItems = [],
  navItemsBottom = [],
  logo,
}: Props) {
  const searchbar = { ..._searchbar};
  return (
    <>
      <header style={{ height: headerHeight }}>
        <div class="bg-base-100 fixed w-full z-50">
          <Navbar items={navItems} itemsBottom={navItemsBottom} searchbar={searchbar} logo={logo} />
        </div>

        <Modals
          menu={{ items: navItems, itemsBottom: navItemsBottom }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
