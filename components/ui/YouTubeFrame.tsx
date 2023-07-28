interface Props {
  videoUrl?: string;
  width?: number;
  height?: number;
}

const YouTubePlayer = ({ videoUrl, width, height }: Props) => {
  const embedUrl = `${videoUrl}`;

  return (
    <iframe
      class={`w-[calc(100%-30px)] min-h-[200px] h-[50vw] my-0 mx-auto`}
      width={width}
      height={height}
      src={embedUrl}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    >
    </iframe>
  );
};

export default YouTubePlayer;
