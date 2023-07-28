import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  image: LiveImage;
  alt?: string;
}

function BannerLarge({ image, alt }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex items-center justify-center pt-[30px]"
    >
      <Picture>
        <Source
          src={image}
          width={375}
          height={791}
        />
        <img
          class="w-full h-auto"
          src={image}
          alt={alt}
        />
      </Picture>
    </div>
  );
}

export default BannerLarge;
