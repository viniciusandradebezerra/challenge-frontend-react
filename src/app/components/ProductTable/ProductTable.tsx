"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableContainer,
  Pagination,
  Box,
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
import { formatCurrency } from "@utils";

export const ProductTable = ({
  products,
}: {
  products: TProductDto[] | undefined;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation(ProductsApi.deleteProduct);
  const { setMessage } = useToastMessage();
  const { getItem, setItem } = useStorage();
  const { setCart } = useCartStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteProductMutation.mutateAsync({ id: id });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setMessage({ title: "Produto deletado com sucesso!", type: "success" });
    } catch (error) {
      setMessage({ title: "Algo aconteceu, tente novamente!", type: "error" });
      console.error("Error: ", error);
    }
  };

  const handleAddItemCart = (product: TProductDto) => {
    // ... (Your existing code for adding items to the cart)
  };

  useEffect(() => {
    const listProducts = getItem("cart", "local");
    const listProductsTreated = listProducts ? JSON.parse(listProducts) : [];
    listProductsTreated && setCart(listProductsTreated);
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Produto</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(product.id!)}
                    aria-label="Deletar"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => router.push(`/editar/${product.id!}`)}
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleAddItemCart(product)}
                    aria-label="Visualizar"
                  >
                    <ShoppingBasketIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box justifyContent={"center"} mt={4}>
        <Pagination
          count={Math.ceil((products?.length || 0) / itemsPerPage)}
          page={currentPage}
          onChange={(event, page) => paginate(page)}
        />
      </Box>
    </div>
  );
};
