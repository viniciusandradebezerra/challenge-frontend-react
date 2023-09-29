import { ProductDto } from '@/app/types/product-dto/product.dto'

export type TState = {
  products: [ProductDto] | undefined
}

export type TActions = {
  setProducts: (products: [ProductDto]) => void
}
