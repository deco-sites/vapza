import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

/**
 * @titleBy alt
 */
export interface Card {
  /** @description otimized image */
  image: LiveImage;
  /** @description Image's alt text */
  alt: string;
  title: string;
  description?: string;
  arrowImage?: LiveImage;
}

export interface Props {
  title: string;
  cards?: Card[];
}

function CardItem({ card }: { card: Card }) {
  const {
    image,
    alt,
    title,
    description,
    arrowImage,
  } = card;

  return (
    <div class="flex flex-col items-center justify-center px-1">
      <div>
        <Picture>
          <Source
            src={image}
            width={112}
          />
          <img
            class="w-full h-auto"
            src={image}
            alt={alt}
          />
        </Picture>
      </div>
      <div>
        <h3 class={`uppercase text-sm mt-1 tracking-wider text-black`}>
          {title}
        </h3>
        {description &&
          <p class={`text-xs px-[30px] tracking-widest`}>{description}</p>
        }
      </div>
      {arrowImage &&
        <Picture>
        <Source
          src={arrowImage}
          width={150}
        />
        <img
          class="w-full h-auto"
          src={arrowImage}
        />
      </Picture>
      }
    </div>
  );
}


function ProcessProd({ title, cards }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="relative py-[30px] "
    >
      <h2>{title}</h2>
        {cards?.map((image) => (
            <CardItem card={image} />
        ))}
    </div>
  );
}

export default ProcessProd;
