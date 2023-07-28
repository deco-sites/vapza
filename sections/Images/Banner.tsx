import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  image: LiveImage;
  alt?: string;
}

function Banner({ image, alt }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex items-center justify-center px-4"
    >
      <Picture>
        <Source
          src={image}
          width={345}
        />
        <img
          class="w-full h-auto mb-4"
          src={image}
          alt={alt}
        />
      </Picture>
    </div>
  );
}

export default Banner;
