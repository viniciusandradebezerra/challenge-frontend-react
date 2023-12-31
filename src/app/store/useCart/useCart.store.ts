import { create } from "zustand";
import { TCart, TActions, TState } from "./useCart.interface";

const initialState: TState = {
  cart: undefined,
};

export const useCartStore = create<TState & TActions>()((set) => ({
  ...initialState,
  setCart: (cart: TCart[]) => set({ cart: cart }),
}));
