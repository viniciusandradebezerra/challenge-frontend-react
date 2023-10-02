import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductTable } from "@components";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    pathname: "/",
    back: jest.fn(),
  }),
  usePathname: () => "/",
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../store", () => ({
  useToastMessage: () => ({
    setMessage: jest.fn(),
  }),
  useCartStore: () => ({
    cart: [],
    setCart: jest.fn(),
  }),
}));

describe("ProductTable Component", () => {
  const mockProducts = [
    {
      id: "1",
      name: "Product 1",
      price: "10.99",
      description: "Product 1",
    },
    {
      id: "2",
      name: "Product 2",
      price: "15.99",
      description: "Product 2",
    },
  ];

  it("renders component", () => {
    render(<ProductTable products={mockProducts} />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("deletes a product when delete button is clicked", async () => {
    const mockDeleteProductMutation = {
      mutateAsync: jest.fn(),
    };

    const mockQueryClientInvalidateQueries = jest.fn();

    jest
      .spyOn(require("@tanstack/react-query"), "useMutation")
      .mockReturnValue(mockDeleteProductMutation);
    jest
      .spyOn(require("@tanstack/react-query"), "useQueryClient")
      .mockReturnValue({
        invalidateQueries: mockQueryClientInvalidateQueries,
      });

    render(<ProductTable products={mockProducts} />);

    fireEvent.click(screen.getByTestId("delete-product-1"));

    await waitFor(() => {
      expect(mockDeleteProductMutation.mutateAsync).toHaveBeenCalledWith({
        id: "1",
      });

      expect(mockQueryClientInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["products"],
      });
    });
  });

  it("navigates to /editar/1 when Edit button is clicked on first product", () => {
    const mockPush = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      pathname: "/",
      push: mockPush,
    });

    render(<ProductTable products={mockProducts} />);

    fireEvent.click(screen.getByTestId("edit-product-1"));

    expect(mockPush).toHaveBeenCalledWith("/editar/1");
  });
});
