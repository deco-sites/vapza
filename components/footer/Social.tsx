import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter"
    | "Youtube";
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-2">
          {content.title && <h3 class="text-base uppercase">{content.title}</h3>}
          <ul
            class={`flex flex-wrap items-center`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex m-[5px] items-center"
                  >
                    <span class="flex items-center justify-center">
                      <Icon
                        width={20}
                        height={20}
                        id={item.label}
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
