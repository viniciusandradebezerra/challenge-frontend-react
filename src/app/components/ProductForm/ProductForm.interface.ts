import { TProductDto } from "@/app/types";

export type TFormData = {
    name: string;
    price: string;
    description: string;
};

export interface IProductFormProps {
    product?: TProductDto
    statusFormState: 'edit' | 'add'
}