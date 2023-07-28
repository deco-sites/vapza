import { useId } from "preact/hooks";


export interface Props {
  title: string;
}

function SectionTitle({ title}: Props) {
  const id = useId();

  return (
    <div class={`relative z-[1]`}>
      <h2 class={`section-title title-line`}>{title}</h2>
    </div>
  );
}

export default SectionTitle;
