import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
}

function Newsletter(
  { content, tiled = false }: { content: Props; tiled: boolean },
) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const name =
        (e.currentTarget.elements.namedItem("name") as RadioNodeList)?.value;

      await subscribe({ email, name });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class={`flex flex-col gap-5`}>
      <div class="flex flex-col gap-4">
        {content?.title && (
          <h3 class={"text-2xl text-center"}>
            {content?.title}
          </h3>
        )}
        {content?.description && <div class={`text-sm tracking-wider`}>{content?.description}</div>}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-col gap-4">
            <input
                name="name"
                class="flex-auto input input-bordered rounded-[30px] text-base-content h-[45px]"
                placeholder={content?.form?.placeholder || "Nome*"}
            />
            <input
              name="email"
              class="flex-auto input input-bordered rounded-[30px] text-base-content h-[45px]"
              placeholder={content?.form?.placeholder || "E-mail*"}
            />
            <button
              type="submit"
              class="btn disabled:loading rounded-[30px] bg-primary text-white border-none uppercase tracking-[2px]"
              disabled={loading}
            >
              {content?.form?.buttonText || "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
