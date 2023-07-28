import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Mobile view */}
          <ul class="join join-vertical w-full">
            {sections.map((section) => (
              <li>
                <details
                  class={`collapse collapse-arrow join-item border-b border-base-200`}
                >
                  <summary
                    class={`collapse-title text-base uppercase font-medium after:text-primary`}
                  >
                    <span class="pl-1 py-2">{section.label}</span>
                  </summary>
                  <ul
                    class={`collapse-content`}
                  >
                    {section.items?.map((item) => (
                      <li>
                        <a href={item.href} class="block py-1 link link-hover">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
