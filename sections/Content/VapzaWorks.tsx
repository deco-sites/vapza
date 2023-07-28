import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import YouTubeFrame from "$store/components/ui/YouTubeFrame.tsx"

export interface Props {
  iframe: {
    videoUrl?: string;
    width?: number;
    height?: number;
    backgroundIframe?: LiveImage;
  }
  title: string;
  description: string;
  banner: LiveImage;
  alt?: string;
}

function VapzaWorks({ title, description, banner, iframe, alt}: Props) {
  const id = useId();

  return (
    <>
        <div class={`py-[30px] bg-base-200 bg-[url('${iframe.backgroundIframe}')]`}>
            <YouTubeFrame videoUrl={iframe.videoUrl} width={iframe.width} height={iframe.height}/>
        </div>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div class="flex items-center justify-center px-4">
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
        </div>
    </>
  );
}

export default VapzaWorks;
