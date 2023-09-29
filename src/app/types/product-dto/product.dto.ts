export type TProductDto = {
  id: string;
  name: string;
  description: string;
  price: string;
};

export type TCreateProductDto = TProductDto;

export type TDeleteProductDto = TProductDto;

export type TEditProductDto = TProductDto;

export type TFormProductDto = TProductDto;
