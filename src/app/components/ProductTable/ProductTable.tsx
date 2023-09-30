"use client";
import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { TProductDto } from "@types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductsApi } from "@services";
import { useRouter } from "next/navigation";
import { useCartStore, useToastMessage } from "@store";
import { useStorage } from "@hooks";

export const ProductTable = ({ products }: { products: TProductDto[] | undefined }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const deleteProductMutation = useMutation(ProductsApi.deleteProduct);
    const { setMessage } = useToastMessage();
    const { getItem, setItem } = useStorage();
    const { setCart } = useCartStore();

    const handleDelete = async (id: string) => {
        try {
            await deleteProductMutation.mutateAsync({ id: id });
            queryClient.invalidateQueries({ queryKey: ['products'] })
            setMessage({ title: 'Produto deletado com sucesso!', type: 'success' })
        } catch (error) {
            setMessage({ title: 'Algo aconteceu, tente novamente!', type: 'error' })
            console.log('Error: ', error)
        }
    }

    const handleAddItemCart = (product: TProductDto) => {
        const listProducts = getItem('cart', 'local');

        if (!listProducts) {
            const updatedCart = [{ ...product, quantity: 1 }];
            setItem('cart', JSON.stringify(updatedCart), 'local');
            setCart(updatedCart);
            setMessage({title: "Produto adicionado ao carrinho", type: "success"});
        } else {
            const listProductsTreated = JSON.parse(listProducts);
            const existingProduct = listProductsTreated.find((item: TProductDto) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                listProductsTreated.push({ ...product, quantity: 1 });
            }
            setItem('cart', JSON.stringify(listProductsTreated), 'local');
            setCart(listProductsTreated);
            setMessage({title: "Produto adicionado ao carrinho", type: "success"});
        }
    };

    useEffect(() => {
        const listProducts = JSON.parse(getItem('cart', 'local'));
        listProducts && setCart(listProducts);
    }, [])


    return (
        <TableContainer style={{ maxHeight: "310px", overflowY: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome do Produto</TableCell>
                        <TableCell>Preço</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products?.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDelete(product.id!)} aria-label="Deletar">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => router.push(`/editar/${product.id!}`)} aria-label="Editar">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleAddItemCart(product)} aria-label="Visualizar">
                                    <ShoppingBasketIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};