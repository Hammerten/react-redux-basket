import { Link } from "react-router-dom";
import { selectTotalCount, selectTotalPrice } from "..";
import { useAppSelector } from "../../app/hooks";
import { ButtonComponent } from "../../components";
import { handleCurrency } from "../../utils";
import ProductItemFeature from "./product-item.feature";

export default function ProductListFeature() {
  const products = useAppSelector((state) => state.productList.value) ?? [];
  const totalPrice = useAppSelector(selectTotalPrice) ?? 0;
  const totalCount = useAppSelector(selectTotalCount) ?? 0;

  return (
    <>
      <div className="flex justify-end py-4 border-b border-black border-opacity-10">
        <Link to="/checkout">
          <ButtonComponent variant="primary">
            <div className="space-x-4">
              <span>{`Total items: ${totalCount}`}</span>
              <span>{`Total cost: ${handleCurrency(totalPrice)}`}</span>
            </div>
          </ButtonComponent>
        </Link>
      </div>
      <div className="grid grid-flow-row gap-4 py-4">
        {products.map((product) => (
          <ProductItemFeature key={product.sku} data={product} />
        ))}
      </div>
      <div className="flex justify-end py-4">
        <Link to="/checkout">
          <ButtonComponent variant="primary">Checkout</ButtonComponent>
        </Link>
      </div>
    </>
  );
}
