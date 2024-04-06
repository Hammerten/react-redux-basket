import { IProduct } from "./product.interface";

export interface IBasketItem {
  sku: number;
  quantity: number;
  product: IProduct;
}

export interface IBasket {
  basket: IBasketItem[];
}
