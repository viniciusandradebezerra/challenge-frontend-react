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
  Button,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICheckoutBody, TProductDto } from "@types";
import { useCartStore, useToastMessage } from "@store";
import { useStorage } from "@hooks";
import { TCart } from "@/app/store/useCart/useCart.interface";
import { PaymentApi } from "@services";
import { formatCurrency, transformValueToPayment } from "@utils";

export const Cart = () => {
  const { setMessage } = useToastMessage();
  const { getItem, setItem } = useStorage();
  const { setCart, cart } = useCartStore();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemoveItemCart = (productId: string) => {
    const listProducts = getItem("cart", "local");

    if (listProducts) {
      const listProductsTreated = JSON.parse(listProducts);
      const existingProductIndex = listProductsTreated.findIndex(
        (item: TProductDto) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        listProductsTreated.splice(existingProductIndex, 1);
        setItem("cart", JSON.stringify(listProductsTreated), "local");
        setCart(listProductsTreated);
        setMessage({ title: "Item removido do carrinho", type: "success" });
      }
    }
  };

  const handleAddItemCart = (product: TProductDto, increment: boolean) => {
    const listProducts = getItem("cart", "local");

    if (!listProducts) {
      const updatedCart = [{ ...product, quantity: 1 }];
      setItem("cart", JSON.stringify(updatedCart), "local");
      setCart(updatedCart);
      setMessage({ title: "Carrinho alterado", type: "success" });
    } else {
      const listProductsTreated = JSON.parse(listProducts);
      const existingProductIndex = listProductsTreated.findIndex(
        (item: TProductDto) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        if (increment) {
          listProductsTreated[existingProductIndex].quantity += 1;
        } else {
          if (listProductsTreated[existingProductIndex].quantity > 0) {
            listProductsTreated[existingProductIndex].quantity -= 1;
          }
        }
      } else {
        if (increment) {
          listProductsTreated.push({ ...product, quantity: 1 });
        }
      }

      if (listProductsTreated[existingProductIndex]?.quantity === 0) {
        listProductsTreated.splice(existingProductIndex, 1);
      }

      setItem("cart", JSON.stringify(listProductsTreated), "local");
      setCart(listProductsTreated);
      setMessage({ title: "Carrinho alterado", type: "success" });
    }
  };

  const handlePayment = async () => {
    try {
      const body: ICheckoutBody = {
        products: cart!,
        total: Number(transformValueToPayment(String(totalPrice))),
      };
      await PaymentApi.checkout(body);
      setMessage({
        title: "Carrinho enviado para o checkout!",
        type: "success",
      });
    } catch (error) {
      setMessage({ title: "Algo aconteceu, tente novamente!", type: "error" });
    }
  };

  useEffect(() => {
    const listProducts = getItem("cart", "local");
    const listProductsTreated = listProducts ? JSON.parse(listProducts) : [];
    listProductsTreated && setCart(listProductsTreated);
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cart?.forEach((product: TCart) => {
        total += Number(product.price) * product.quantity;
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart]);

  return (
    <>
      <TableContainer style={{ maxHeight: "310px", overflowY: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Produto</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleAddItemCart(product, false)}>
                    -
                  </IconButton>
                  {product.quantity}
                  <IconButton onClick={() => handleAddItemCart(product, true)}>
                    +
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveItemCart(product.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{ textAlign: "right", margin: "10px" }}>
        <Typography sx={{ margin: "1rem 0" }}>
          Total em Reais: {formatCurrency(totalPrice)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handlePayment}>
          Realizar Pagamento
        </Button>
      </Box>
    </>
  );
};
