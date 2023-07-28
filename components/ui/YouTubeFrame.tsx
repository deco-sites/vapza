interface Props {
    videoUrl?: string;
    width?: number;
    height?: number;
}

const YouTubePlayer = ({ videoUrl, width, height }: Props) => {
    const embedUrl = `${videoUrl}`;
  
    return (
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    );
  };
  
  export default YouTubePlayer;