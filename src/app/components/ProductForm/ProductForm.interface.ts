import { TProductDto } from "@/app/types";

export type FormData = {
    name: string;
    price: string;
    description: string;
};

export interface ProductFormProps {
    product?: TProductDto
    statusFormState: 'edit' | 'add'
}