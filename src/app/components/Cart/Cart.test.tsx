import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Cart } from "./Cart";

jest.mock("../../store", () => ({
  useToastMessage: () => ({
    setMessage: jest.fn(),
  }),
  useCartStore: () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    setCart: jest.fn(),
    cart: [],
  }),
}));

jest.mock("../../hooks", () => ({
  useStorage: () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
  }),
}));

jest.mock("../../services", () => ({
  PaymentApi: {
    checkout: jest.fn(),
  },
}));

describe("Cart Component", () => {
  it("renders component", () => {
    render(<Cart />);
    expect(
      screen.getByText((content, element) => {
        return content.includes("Realizar Pagamento");
      })
    ).toBeInTheDocument();
  });
});
