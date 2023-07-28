import Icon from "$store/components/ui/Icon.tsx";

export interface PaymentItem {
  label:
    | "Diners"
    | "Elo"
    | "Mastercard"
    | "Visa"
    | "Hipercard"
    | "Boleto"
    | "AmericanExpress";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4 sm:items-center">
          {content.title && (
            <h3 class="text-base uppercase">{content.title}</h3>
          )}
          <ul class="flex items-center gap-4 flex-wrap">
            {content.items.map((item) => {
              return (
                <li
                  class="flex items-center justify-center"
                  title={item.label}
                >
                  <Icon
                    width={40}
                    height={32}
                    strokeWidth={1}
                    id={item.label}
                    class={``}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
