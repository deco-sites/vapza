import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div>
      <ul class={`flex`}>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class={`flex items-center justify-center`}>
              {name != "Home"
                ? (
                  <span
                    class={`w-[5px] h-[5px] rounded-full bg-secondary my-[7px] mx-[10px]`}
                  >
                  </span>
                )
                : <></>}
              <a
                href={item}
                class={`${
                  name != "Home" ? "text-secondary" : "text-black"
                } text-sm`}
              >
                {name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
