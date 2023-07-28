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

function CardItem({ card }: { card: Card}) {
  const {
    image,
    alt,
    title,
    description,
    arrowImage,
  } = card;

  return (
    <>
    <div class="flex flex-row items-center justify-start w-full odd:flex-row-reverse">
      <div>
        <Picture>
          <Source
            src={image}
            width={112}
          />
          <img
            class="h-auto w-[112px] min-w-[112px]"
            src={image}
            alt={alt}
          />
        </Picture>
      </div>
      <div>
        <h3 class={`uppercase text-[13px] leading-[18px] mx-5 tracking-wider text-primary`}>
          {title}
        </h3>
        {description &&
          <p class={`text-xs mx-5 tracking-widest`}>{description}</p>}
      </div>
    </div>
    {arrowImage &&
      (
      <>
      <div></div>
      <div>
        <Picture >
          <Source
            src={arrowImage}
            width={150}
          />
          <img
            class="w-full h-auto max-w-[150px] my-5"
            src={arrowImage}
          />
        </Picture>
        </div>
        </>
      )}
      {!arrowImage &&
      (<div></div>
      )}
    </>
  );
}

function ProcessProd({ title, cards }: Props) {
  const id = useId();

  return (
    <div class={`py-[30px] bg-base-200`}>
      <div
        id={id}
        class="relative flex flex-col items-center justify-center px-4 z-[1]"
      >
        <h2 class={`title-line uppercase text-xl py-2.5 px-4 mb-4 mx-[50px] text-primary text-center leading-6 bg-base-200`}>{title}</h2>
        {cards?.map((image, index) => <CardItem card={image} key={index}/>)}
      </div>
    </div>
  );
}

export default ProcessProd;
