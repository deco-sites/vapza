import { useMemo } from "preact/hooks";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";
import Icon from "$store/components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior desconto",
};
function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class={`relative w-full`}>
      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="relative w-full h-10 pl-4 rounded-[40px] mt-4 border border-secondary text-secondary cursor-pointer outline-none appearance-none"
      >
        <option key={""} value={""} selected={true}>
          <span class="text-sm">Selecione</span>
        </option>
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings],
        })).filter(({ label }) => label).map(({ value, label }) => (
          <option key={value} value={value}>
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select>
      <div class={"absolute right-4 top-[25px] flex w-5 h-5 text-secondary"}>
        <Icon id="ChevronDown" width={20} height={20} strokeWidth={2} />
      </div>
    </div>
  );
}

export default Sort;
