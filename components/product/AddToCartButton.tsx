import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  variant: "cardProd" | "page-product" | "page-product-hass-signature"
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name, variant }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  return (
    <>
    {variant == "cardProd" ?
      <Button data-deco="add-to-cart" {...props} class={`btn-card-prod`}>
        <Icon size={25} id="ShoppingCartProd" strokeWidth={2} class="" />
        Adicionar à Sacola
      </Button>
      : variant == "page-product" ?
      <Button data-deco="add-to-cart" {...props} class={`btn-page-prod`}>
        Comprar Agora
      </Button>
      : variant == "page-product-hass-signature" ?
      <Button data-deco="add-to-cart" {...props} class={`btn-card-prod`}>
        Comprar Agora
      </Button>
      : <span>Error: Variant not defined</span>
    }
    </>
  );
}

export default AddToCartButton;
