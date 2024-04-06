import React from "react";
import { modifyProductQuantity, removeProductFromCart } from "..";
import { useAppDispatch } from "../../app/hooks";
import { ButtonComponent } from "../../components";
import { IBasketItem } from "../../interfaces";
import { handleCurrency } from "../../utils";

interface CheckoutItemFeatureProps {
  data: IBasketItem;
}

function calcTotalPrice(quantity: number, price: number) {
  return quantity * price;
}

export default function CheckoutItemFeature(props: CheckoutItemFeatureProps) {
  const dispatch = useAppDispatch();
  const { data } = props;

  function handleProductQuantityChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    dispatch(
      modifyProductQuantity({ sku: data.sku, quantity: Number(e.target.value) })
    );
  }

  function handleRemoveProductFromCart() {
    dispatch(removeProductFromCart(data.sku));
  }

  if (!data) {
    return null;
  }

  const { product, quantity } = data;

  return (
    <div className="grid grid-cols-5 gap-4 items-center">
      <div>{product.name}</div>
      <div>{quantity}</div>
      <div>
        <select onChange={handleProductQuantityChange} defaultValue={quantity}>
          {Array.from(
            {
              length: product.basketLimit,
            },
            (_, i) => {
              const optionQuantity = i + 1;
              return (
                <option key={optionQuantity} value={optionQuantity}>
                  {optionQuantity}
                </option>
              );
            }
          )}
        </select>
      </div>
      <div>{handleCurrency(calcTotalPrice(quantity, product.price))}</div>
      <ButtonComponent variant="danger" onClick={handleRemoveProductFromCart}>
        Remove All
      </ButtonComponent>
    </div>
  );
}
