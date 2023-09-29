import { TProductDto } from "@/app/types/product-dto/product.dto";

export type TCart = {
  quantity: number;
} & TProductDto;

export type TState = {
  cart: [TCart] | undefined;
};

export type TActions = {
  setCart: (cart: [TCart]) => void;
};
