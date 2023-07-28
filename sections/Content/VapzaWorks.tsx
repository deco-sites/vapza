import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import YouTubeFrame from "$store/components/ui/YouTubeFrame.tsx";

export interface Props {
  iframe: {
    videoUrl?: string;
    width?: number;
    height?: number;
    backgroundIframe?: LiveImage;
  };
  title: string;
  description: string;
  banner: LiveImage;
  alt?: string;
  href: string;
}

function VapzaWorks({ title, description, banner, iframe, alt, href }: Props) {
  const id = useId();

  return (
    <>
      <div
        class={`pt-4 min-h-[320px] h-[70vw]`}
        style={`background: url('${iframe.backgroundIframe}') no-repeat; background-size: 100% 100%`}
      >
        {/* <YouTubeFrame
          videoUrl={iframe.videoUrl}
          width={iframe.width}
          height={iframe.height}
        /> */}
      </div>
      <div class={`px-4 flex flex-col gap-10`}>
        <h2 class={`text-2xl text-primary pb-4`}>{title}</h2>
        <p class={`text-[15px] text-black mb-7`}>{description}</p>
      </div>
      <a class="flex items-center justify-center px-4" href={href}>
        <Picture>
          <Source
            src={banner}
            width={345}
            height={345}
          />
          <img
            class="w-full h-auto mb-4"
            src={banner}
            alt={alt}
          />
        </Picture>
      </a>
    </>
  );
}

export default VapzaWorks;
