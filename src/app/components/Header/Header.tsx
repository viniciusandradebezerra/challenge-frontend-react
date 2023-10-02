"use client";
import { AppBar, Toolbar, IconButton, Button, Box, Badge } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  AddShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/store";

export const Header = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const [badgeContentNumber, setBadgeContentNumber] = useState(0);
  const { cart } = useCartStore();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setShowBackButton(pathname !== "/");
  }, [pathname, setShowBackButton]);

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    let quantity = 0;

    cart?.map((item) => (quantity += item.quantity));

    setBadgeContentNumber(quantity);
  }, [cart]);

  return (
    <AppBar position="static" sx={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Voltar"
              data-testid="icon-back"
              onClick={handleBackButtonClick}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Box>
        <IconButton
          data-testid="shopping-cart"
          color="inherit"
          onClick={() => router.push("/carrinho")}
        >
          <Badge badgeContent={badgeContentNumber} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Button color="inherit" onClick={() => router.push("/adicionar")}>
          Adicionar Produto
        </Button>
      </Toolbar>
    </AppBar>
  );
};
