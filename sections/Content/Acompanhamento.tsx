import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

/**
 * @titleBy alt
 */
export interface Card {
  /** @description mobile otimized image */
  icon: LiveImage;
  /** @description Image's alt text */
  alt: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  }
}

export interface Props {
  cards?: Card[];
}

function CardItem({ card }: { card: Card }) {
  const {
    icon,
    alt,
    title,
    description,
  } = card;

  return (
    <div class="flex flex-col items-center justify-center w-[85%] my-0 mx-auto text-center gap-[5px]">
      <Picture>
        <Source
          src={icon}
          width={40}
        />
        <img
          class="w-full h-auto max-h-[38px] max-w-[37px]"
          src={icon}
          alt={alt}
        />
      </Picture>
      <h3 class={`uppercase text-sm mt-1 tracking-wider text-black`}>
        {title}
      </h3>
      <p class={`text-xs px-[30px] tracking-widest`}>{description}</p>
      <a href={`${card.cta.href}`}>
        <button>{card.cta.label}</button>
      </a>
    </div>
  );
}

function Acompanhamento({ cards }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex flex-col gap-5"
    >
        {cards?.map((icon, index) => (
            <CardItem card={icon} />
        ))}
    </div>
  );
}

export default Acompanhamento;
