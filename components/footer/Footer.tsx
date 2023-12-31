import Logo from "$store/components/footer/Logo.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Social from "$store/components/footer/Social.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter"
    | "Youtube";
  link: string;
}

export interface PaymentItem {
  label:
    | "Diners"
    | "Elo"
    | "Mastercard"
    | "Visa"
    | "Hipercard"
    | "Boleto"
    | "AmericanExpress";
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
  };
}

export interface Props {
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  logo?: {
    image: LiveImage;
    description?: string;
  };
  sections?: Section[];
  protecao?: {
    title: string;
    imagem: LiveImage;
  };
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  layout?: Layout;
  footerFinally?: {
    span: string;
    logoEsq: LiveImage;
    logoDir: LiveImage;
  };
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }],
  },
  protecao,
  footerFinally,
  layout = {
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      tiled={false}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={false}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={false} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;

  return (
    <footer
      class={`w-full flex flex-col pt-10 bg-black gap-10`}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
            {_newsletter}
          </div>
          <Divider />
          <div>
            {_logo}
          </div>
          {_sectionLinks}
          <div class="flex justify-center gap-12">
            <div class={`flex flex-col gap-2`}>
              <h3 class={`uppercase`}>{protecao?.title}</h3>
              <img src={protecao?.imagem} alt={protecao?.title} />
            </div>
            {_social}
          </div>
          <div class="flex flex-col gap-10">
            {_payments}
          </div>
        </div>
      </div>
      <div class={`flex flex-col justify-center items-center bg-[#111111]`}>
        <span class={`px-4 text-center text-sm text-white mb-4 pt-4`}>
          {footerFinally?.span}
        </span>
        <div class={`flex justify-center items-center pb-4 gap-4`}>
          <img src={footerFinally?.logoEsq} />
          <img src={footerFinally?.logoDir} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
