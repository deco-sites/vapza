import { useId } from "preact/hooks";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 450;
const HEIGHT = 450;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfoSpecification({ page }: {page: ProductDetailsPage}) {
  const {product} = page;
  const {isVariantOf} = product;
  const specification = isVariantOf?.additionalProperty;

  let tableNutri, imgProd, contemGluten, alergicosComp, validade, 
  videoReceita, condArmazenamento, imgProdPreparado, modoPreparo, certificacoes = '',
  imgProdOrigem, titleRec, subTitleRec, ingredientes, imgReceita, linha, 
  ingredientesBase, obsIngredienteBase, imgProdBase, qtd;

  function createMarkup(htmlString: string) {
    return { __html: htmlString };
  }

  const adicionarQuebraDeLinha = (texto: string) => {
    return texto
    .split('.')
    .join('.<br><br>')
    .split(':')
    .join(':<br><br>')
    .split(';')
    .join(';<br><br>');
  };
  product.additionalProperty?.map((data) => {
    if(data.name === 'category'){
      linha = data.value;
    }
  })
  specification?.map((data) => {
    if(data.name === "HTML tabela nutricional"){
      tableNutri = <div class={`table-nutri-pdp`} dangerouslySetInnerHTML={createMarkup(data.value || "")}/>
    }
    if(data.name === "Foto produto"){
      imgProd = <div class={`w-[152px] flex items-center justify-center mt-[10px] mb-[30px] mx-auto`} dangerouslySetInnerHTML={createMarkup(data.value || "")}/>
    }
    if(data.name === "Contém glutén?"){
      contemGluten =  <div class={`flex flex-col text-sm`}>
                        <span class={`text-black py-[5px] pr-5 font-black`}>{data.name}</span>
                        <span class={`text-black py-[5px] pr-5`}>{data.value}</span>
                      </div>
    }
    if(data.name === "Info. complementar alérgicos:"){
      alergicosComp = <div class={`flex flex-col text-sm`}>
                        <span class={`text-black py-[5px] pr-5 font-black`}>{data.name}</span>
                        <span class={`text-black py-[5px] pr-5`}>{data.value}</span>
                      </div>
    }
    if(data.name === "Prazo de validade:"){
      validade = <div class={`flex flex-col text-sm`}>
                  <span class={`text-black py-[5px] pr-5 font-black`}>{data.name}</span>
                  <span class={`text-black py-[5px] pr-5`}>{data.value}</span>
                </div>
    }
    if(data.name === "Vídeo receita YouTube"){
      videoReceita = <div class={`container-iframe-pdp`}>
                        <h3 class={`text-center text-primary text-xl mb-4`}>{data.name}</h3>
                        <div dangerouslySetInnerHTML={createMarkup(data.value || "")}/>
                      </div>
    }
    if(data.name === "Condições de armazenamento"){
      condArmazenamento = <div class="flex flex-col mt-[30px] mb-10">
                            <h3 class={`text-center text-primary text-xl mb-4`}>{data.name}</h3>
                            <span class="text-black py-[5px] pr-5 text-sm">{data.value}</span>
                          </div>
    }
    if(data.name === "Foto produto preparado"){
      imgProdPreparado = <div class={`w-[80%]`}>
                            <div dangerouslySetInnerHTML={createMarkup(data.value || "")}/>
                          </div>
    }
    if(data.name === "Modo de preparo"){
      modoPreparo = <div>
                      <h3 class={`text-primary text-xl mb-4 mt-5`}>{data.name}</h3>
                      <div class={`text-black text-sm`}
                      dangerouslySetInnerHTML={createMarkup(adicionarQuebraDeLinha(data.value || "") || "")}/>
                    </div>
    }
    if(data.name === "Certificações"){
      certificacoes = `${certificacoes} <span>${data.value},</span>`
    }
    if(data.name === "Foto no estado de origem do produto"){
      imgProdOrigem = <div class={`absolute bottom-[-100px] right-0 opacity-30`}>
                        <div dangerouslySetInnerHTML={createMarkup(data.value || "")}/>
                      </div>
    }
    if(data.name === "Título Receita"){
      titleRec = <div>
                    <h3 class={`text-primary text-xl mt-5`}>{data.value}</h3>
                 </div>
    }
    if(data.name === "Título ingredientes 1"){
      subTitleRec = <div>
                      <span class={`text-primary text-sm`}>{data.value}</span>
                    </div>
    }
    if(data.name === "Lista ingredientes 1"){
      ingredientes = <div>
                      <div class={`text-black text-sm`}
                      dangerouslySetInnerHTML={createMarkup(adicionarQuebraDeLinha(data.value || "") || "")}/>
                    </div>
    }
    if(data.name === "Imagem ilustrativa da receita"){
      imgReceita = <div class={`absolute bottom-0 right-0 opacity-30`}>
                     <div class="container-img-pdp" dangerouslySetInnerHTML={createMarkup(data.value || "")}/>
                   </div>
    }
    if(data.name === "Ingredientes"){
      ingredientesBase = <span class={`text-black text-sm`}>{data.value}</span>
    }
    if(data.name === "Obs ingredientes"){
      obsIngredienteBase = <span class={`text-black text-sm`}>{data.value}</span>
    }
    if(data.name === "Foto informações base"){
      imgProdBase =   <div class={`absolute top-0 right-0 opacity-30 w-[60%]`}>
                        <div dangerouslySetInnerHTML={createMarkup(data.value || "")}/>
                      </div>
    }
    if(data.name === "Quantidade"){
      qtd = <span class={`text-black text-sm`}>{data.value}</span>
    }
    
  });

  return (
    <>
    <div class={`relative`}>
      <h3 class={`text-primary text-xl mb-4`}>Informações base</h3>
      <div class={`flex flex-col gap-[30px] mb-10`}>
        {imgProdBase}
        <div class={`flex flex-row gap-6`}>
          <Icon size={40} id="chapeu" strokeWidth={1} class="" />
          <div class={`flex flex-col`}>
              <h4 class={`uppercase font-black text-black text-sm leading-[22px]`}>Linha</h4>
              <span class={`text-sm text-black`}>{linha}</span>
          </div>
        </div>
        <div class={`flex flex-row gap-6`}>
          <Icon size={40} id="livro" strokeWidth={1} class="" />
          <div class={`flex flex-col`}>
              <h4 class={`uppercase font-black text-black text-sm leading-[22px]`}>Ingredientes</h4>
              {ingredientesBase}
              {obsIngredienteBase}
          </div>
        </div>
        <div class={`flex flex-row gap-6`}>
          <Icon size={40} id="box" strokeWidth={1} class="" />
          <div class={`flex flex-col`}>
              <h4 class={`uppercase font-black text-black text-sm leading-[22px]`}>Quantidade</h4>
              {qtd}
          </div>
        </div>
        {/*IMPLEMENTAR PARA DIMENSÕES E PESO LIQUIDO */}
      </div>
    </div>
      {imgProd ? 
        <>
          <h3 class={`text-center text-primary text-xl mb-4`}>Informações Nutricionais</h3>
          {imgProd}
          {tableNutri}
        </>
      :
        <></>
      }
      <div class={`pb-5 mb-10 border-b border-b-[#ccc]`}>
        <h3 class={`text-primary text-xl mb-4 mt-5`}>Alérgicos</h3>
        {contemGluten}
        {alergicosComp}
        {validade}
      </div>
      {videoReceita}
      {condArmazenamento}
      {imgProdPreparado}
      {modoPreparo?
        <div class={`mb-10 relative`}>
          {modoPreparo}
          {imgProdOrigem}
          <div class={`text-sm text-black`} dangerouslySetInnerHTML={createMarkup(certificacoes || "")}/>
        </div>
      :
        <></>
      }
      {titleRec? 
        <div class={`flex flex-col gap-4 relative`}>
            {titleRec}
            <span class={`text-primary text-xl`}>Ingredientes</span>
            {subTitleRec}
            {ingredientes}
            {imgReceita}
        </div>
      :
        <></>
      }

    </>
  );
}

function ProductInfo({ page }: {page: ProductDetailsPage}) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
  );
  
  return (
    <>
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <h1
          class={`flex flex-col gap-2 text-xl text-black tracking-[1px] uppercase`}
        >
          {isVariantOf?.name != name
            ? (
              <>
                {isVariantOf?.name}
                <span class="text-black text-xs">{name}</span>
              </>
            )
            : <>{name}</>
            }
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-col gap-1\">
          {listPrice != price &&
            (
              <span class="line-through text-base-content text-sm leading-[1]">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </span>
            )}
          <span class="font-medium text-3xl text-secondary">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                  price={price ?? 0}
                  discount={price && listPrice ? listPrice - price : 0}
                  name={product.name ?? ""}
                  productGroupId={product.isVariantOf?.productGroupID ?? ""}
                  variant="page-product"
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Description card */}
      <div class="mt-[30px]">
        {description && <p class={`text-sm text-black`}>{description}</p>}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller ?? "1",
          }]}
        />
      </div>
      {/* Informações dos produtos */}
      <div>
        <ProductInfoSpecification page={page}/>
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const { product, breadcrumbList } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        {/* Breadcrumb */}
        <div class={`mt-4 mb-[30px] px-4`}>
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          />
        </div>

        <div
          id={id}
          class="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_40vw_40vw] sm:grid-rows-1 sm:justify-center"
        >
          {/* Image Slider */}
          <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
            <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  <Image
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <div class="absolute top-2 right-2 bg-base-100 rounded-full">
              <ProductImageZoom
                images={images}
                width={1280}
                height={1280 * HEIGHT / WIDTH}
              />
            </div>
          </div>

          {/* Dots */}
          <ul class="flex items-center justify-center gap-2 overflow-auto px-4">
            {images.map((img, index) => (
              <li class="min-w-[70px] min-h-[70px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-secondary border rounded-[10px] "
                    width={70}
                    height={70}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>

          {/* Product Info */}
          <div class="px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="container py-0 sm:py-10">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
