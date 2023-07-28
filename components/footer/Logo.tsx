import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  logo?: {
    image: LiveImage;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col items-center gap-5">
          <div class="w-[130px] max-h-[75px]">
            <img
              src={logo?.image}
              alt={logo?.description}
              width={130}
            />
          </div>
          <div class="text-xl text-white">
            {logo?.description}
          </div>
        </div>
      )}
    </>
  );
}
