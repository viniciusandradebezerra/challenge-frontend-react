import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@components";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    pathname: "/carrinho",
    back: jest.fn(),
    push: jest.fn(),
  }),
  usePathname: () => "/carrinho",
}));

jest.mock("../../store", () => ({
  useCartStore: () => ({
    cart: [],
  }),
}));

describe("Header Component", () => {
  it("render component", () => {
    render(<Header />);
    expect(screen.getByText("Adicionar Produto")).toBeInTheDocument();
  });

  it("should redirect to /carrinho when clicking on cart icon", () => {
    const mockPush = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      pathname: "/",
      back: jest.fn(),
      push: mockPush,
    });

    render(<Header />);
    const cartIcon = screen.getByTestId("shopping-cart");
    fireEvent.click(cartIcon);
    expect(mockPush).toHaveBeenCalledWith("/carrinho");
  });

  it("should show back button when showBackButton is true", () => {
    const mockPush = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      pathname: "/outrapagina",
      back: jest.fn(),
      push: mockPush,
    });

    render(<Header />);

    expect(screen.getByTestId("icon-back")).toBeInTheDocument();
  });

  it("deve chamar a função de voltar ao clicar no botão de voltar", () => {
    const mockBack = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      pathname: "/outrapagina",
      back: mockBack,
      push: jest.fn(),
    });

    render(<Header />);
    const backButton = screen.getByTestId("icon-back");
    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
