import Modal from "$store/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "$store/sdk/useUI.ts";
import { useEffect } from "preact/hooks";
import Menu from "$store/components/header/Menu.tsx";
import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
}

function Modals({ menu, searchbar }: Props) {
  const { displayCart, displayMenu, displaySearchbar } = useUI();

  useEffect(() => {
    if (displayMenu.value === false) {
      document.getElementsByTagName("body").item(0)?.classList.remove(
        "no-scroll",
      );
    } else if (displayMenu.value === true) {
      document.getElementsByTagName("body").item(0)?.classList.add(
        "no-scroll",
      );
    }
  }, [displayMenu.value]);

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      <div
        class={`${
          displayMenu.value ? "animate-slide-top block" : "hidden"
        } bg-white ease-linear duration-500 z-40 fixed left-0 w-full h-full`}
      >
        <Suspense fallback={fallback}>
          <Menu {...menu} />
        </Suspense>
      </div>

      <Modal
        title="Buscar"
        mode="sidebar-right"
        loading="lazy"
        open={displaySearchbar.value &&
          window?.matchMedia("(max-width: 767px)")?.matches}
        onClose={() => {
          displaySearchbar.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Searchbar {...searchbar} />
        </Suspense>
      </Modal>

      <Modal
        title="Minha sacola"
        mode="sidebar-right"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Cart />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
