import { TCart } from "@/app/store/useCart/useCart.interface";

export interface ICheckoutBody {
    products: TCart[];
    total: number;
    customerId?: string
  }