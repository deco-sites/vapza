import Icon from "$store/components/ui/Icon.tsx";
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
    <div class="">
      <Picture>
        <Source
          src={icon}
          width={35}
          height={35}
        />
        <img
          class=""
          src={icon}
          alt={alt}
        />
      </Picture>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn-slider-vapza-bg ">
          <Icon
            class="rotate-45 btn-left"
            size={12}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2 mt-[60px]">
        <Slider.NextButton class="btn-slider-vapza-bg ">
          <Icon
            class="rotate-[225deg] btn-right"
            size={12}
            id="ChevronRight"
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
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
        {cards?.map((icon, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <CardItem card={icon} />
          </Slider.Item>
        ))}
      </Slider>

      <Buttons />
    </div>
  );
}

export default IconCarousel;
