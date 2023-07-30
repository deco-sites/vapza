import Icon from "$store/components/ui/Icon.tsx";

export interface IconItem {
  label:
    // | "Grid"
    // | "ToqueFinal"
    // | "SoAquecer"
    // | "Organico"
    // | "Single"
    "PratosProntos";
  // | "Kits";
}
export interface NavItem {
  icon: IconItem;
  label: string;
  href: string;
}
export interface Props {
  items: NavItem[];
  itemsBottom: NavItem[];
}

function MenuItem({ item }: { item: NavItem }) {
  return (
    <div class={`flex items-center py-[18px] pl-4 gap-3`}>
      <Icon id={item?.icon?.label} width={18} height={18} strokeWidth={1} />
      <a
        class="text-xs text-primary uppercase tracking-widest leading-5"
        href={item.href}
      >
        {item.label}
      </a>
    </div>
  );
}

function Menu({ items, itemsBottom }: Props) {
  return (
    <>
      <ul class="flex flex-col border-b border-base-200">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="bg-black flex flex-col">
        {itemsBottom.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Menu;
