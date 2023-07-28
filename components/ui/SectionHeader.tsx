interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  labelPromo?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col  ${
              props.alignment === "left" ? "text-left pl-4" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={`text-sm uppercase leading-5
                  ${
                    props.colorReverse
                      ? "text-primary"
                      : "text-black"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-3xl" : "lg:text-4xl"}
                `}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <h2
                  class={`text-xl leading-6 
                  ${
                    props.colorReverse ? "text-primary" : "text-black"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-xl" : "lg:text-2xl"}
                `}
                >
                  {props.description}
                </h2>
              )}
              {props.labelPromo &&
              (
                <h3
                  class={`text-xl leading-6
                  ${
                    props.colorReverse ? "text-primary" : "text-secondary"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-xl" : "lg:text-2xl"}
                `}
                >
                  {props.labelPromo}
                </h3>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
