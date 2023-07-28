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
      <div id={id} class="relative flex flex-col items-center justify-center px-4 z-[1]">
        <Picture>
          <Source
            src={image}
            width={150}
          />
          <img
            class="w-full h-auto max-w-[150px] my-5"
            src={image}
            alt={alt}
          />
        </Picture>
      </div>
  );
}

export default Banner;
