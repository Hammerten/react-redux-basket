import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ButtonComponent } from "../../components";
import CheckoutItemFeature from "./checkout-item.feature";
import { selectTotalCount, selectTotalPrice } from ".";
import { handleCurrency } from "../../utils";
import React from "react";

export default function CheckoutFeature() {
  const { basket } = useAppSelector((state) => state.basket.value) ?? {};
  const totalPrice = useAppSelector(selectTotalPrice) ?? 0;
  const totalCount = useAppSelector(selectTotalCount) ?? 0;
  const [bankCard, setBankCard] = React.useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(basket);
  }

  function handleBankCardChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBankCard(e.target.value);
  }

  return (
    <>
      <div className="flex py-4 justify-end space-x-4 border-b border-black border-opacity-10">
        <span>{`Total items: ${totalCount}`}</span>
      </div>
      <div className="grid grid-flow-row gap-4 py-4">
        {basket.map((basketItem) => (
          <CheckoutItemFeature key={basketItem.sku} data={basketItem} />
        ))}
      </div>
      <div className="flex flex-col items-end py-4">
        <span className="mb-2">{`Total cost: ${handleCurrency(
          totalPrice
        )}`}</span>
        <div className="flex w-full justify-between">
          <Link to="/">
            <ButtonComponent variant="secondary">
              Continue Shopping
            </ButtonComponent>
          </Link>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleBankCardChange}
              id="bank-card"
              type="number"
              value={bankCard}
              required
              className="mr-4 p-2 rounded-md"
            />
            <ButtonComponent
              disabled={bankCard.length < 16}
              type="submit"
              variant="primary"
            >
              Checkout
            </ButtonComponent>
          </form>
        </div>
      </div>
    </>
  );
}
