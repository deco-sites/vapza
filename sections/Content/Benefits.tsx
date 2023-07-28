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
      <h3 class={`uppercase text-sm mt-1 tracking-wider text-black`}>{title}</h3>
      <p class={`text-xs px-[30px] tracking-widest`}>{description}</p>
    </div>
  );
}

function Buttons() {
  return (
    <>
      <div class="absolute left-4 top-[30%] flex items-center justify-center z-10 ">
        <Slider.PrevButton class="btn-slider-vapza-border">
          <Icon
            class="rotate-45 btn-left"
            size={12}
            id="ChevronLeftDark"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="absolute right-4 top-[30%] flex items-center justify-center z-10 ">
        <Slider.NextButton class="btn-slider-vapza-border">
          <Icon
            class="rotate-[225deg] btn-right"
            size={12}
            id="ChevronRightDark"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function IconCarousel({ cards }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="relative py-10 grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
        {cards?.map((icon, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <CardItem card={icon} />
          </Slider.Item>
        ))}
      </Slider>

      <Buttons />

      <SliderJS rootId={id} infinite />
    </div>
  );
}

export default IconCarousel;
