import { TCreateProductDto, TEditProductDto } from '@/app/types'
import { api } from '@services'

const getProductById = async ({ id }: {id: string}) => {
  try {
    const { data } = await api.get<any>(`/products?id=${id}`)
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

const getAllProducts = async () => {
  try {
    const { data } = await api.get<any>(`/products`)
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

const editProduct = async (product: TEditProductDto) => {
  try {
    const { data } = await api.put<any>(`/products`, {
      product
    })
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

const addProduct = async (product: TCreateProductDto) => {
  try {
    const { data } = await api.put<any>(`/products`, {
      product
    })
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

const deleteProduct = async ({ id }: {id: string}) => {
  try {
    const { data } = await api.delete<any>(`/products?id=${id}`)
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const CmsApi = {
  getProductById,
  getAllProducts,
  editProduct,
  deleteProduct,
  addProduct
}
