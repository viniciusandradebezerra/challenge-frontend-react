import { TCreateProductDto, TEditProductDto, TProductDto } from '@/app/types';

const apiUrl = 'http://localhost:3000/api/products';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro na solicitação');
  }
  return response.json();
};

const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}?id=${id}`);
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar o produto por ID');
  }
};

const getAllProducts = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await handleResponse(response);
    const { products } = data;
    return products as TProductDto[];
  } catch (error) {
    throw new Error('Erro ao buscar todos os produtos');
  }
};

const editProduct = async (product: TEditProductDto) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    throw new Error('Erro ao editar o produto');
  }
};

const addProduct = async (product: TCreateProductDto) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    throw new Error('Erro ao adicionar o produto');
  }
};

const deleteProduct = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`${apiUrl}?id=${id}`, {
      method: 'DELETE',
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    throw new Error('Erro ao excluir o produto');
  }
};

export const ProductsApi = {
  getProductById,
  getAllProducts,
  editProduct,
  deleteProduct,
  addProduct,
};
