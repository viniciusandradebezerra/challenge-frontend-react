import { ProductDto } from '@/app/types/product-dto/product.dto'
import { create } from 'zustand'
import { TActions, TState } from './useProducts.interface'

const initialState: TState = {
  products: undefined,
}

export const useProductStore = create<TState & TActions>()(set => ({
  ...initialState,
  setProducts: (products: [ProductDto]) => set({ products: products }),
}))