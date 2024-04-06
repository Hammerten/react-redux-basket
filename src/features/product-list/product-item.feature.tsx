import { addToCart, removeSingleProductFromCart, selectCartItem } from "..";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ButtonComponent } from "../../components";
import { IProduct } from "../../interfaces";
import { handleCurrency } from "../../utils";

interface ProductItemFeatureProps {
  data: IProduct;
}

export default function ProductItemFeature(props: ProductItemFeatureProps) {
  const dispatch = useAppDispatch();
  const { data } = props;
  const isInCart = useAppSelector((state) => selectCartItem(state, data.sku));

  const canAddInCart = Boolean(
    !isInCart || (isInCart && isInCart?.quantity < data.basketLimit)
  );
  const canRemoveFromCart = Boolean(isInCart);

  function handleAddToCart() {
    dispatch(addToCart(data));
  }

  function handleRemoveFromCart() {
    dispatch(removeSingleProductFromCart(data.sku));
  }

  if (!props?.data) {
    return null;
  }

  return (
    <div className="grid grid-cols-5 gap-4 items-center">
      <div>{data.name}</div>
      <div>{data.description}</div>
      <div>{handleCurrency(data.price)}</div>
      <div>
        {canAddInCart && (
          <ButtonComponent variant="secondary" onClick={handleAddToCart}>
            Add to cart
          </ButtonComponent>
        )}
      </div>
      <div>
        {canRemoveFromCart && (
          <ButtonComponent variant="danger" onClick={handleRemoveFromCart}>
            Remove from cart
          </ButtonComponent>
        )}
      </div>
    </div>
  );
}
