import { TProductDto } from "@types";

export type TCart = {
  quantity: number;
} & TProductDto;

export type TState = {
  cart: TCart[] | undefined;
};

export type TActions = {
  setCart: (cart: TCart[]) => void;
};
