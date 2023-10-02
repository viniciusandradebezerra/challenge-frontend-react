import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductForm } from "./ProductForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../store", () => ({
  useToastMessage: () => ({
    setMessage: jest.fn(),
  }),
}));

describe("ProductForm Component", () => {
  const mockProduct = {
    id: "1",
    name: "Product 1",
    price: "10.99",
    description: "Product 1",
  };

  it("renders component with 'Adicionar Produto' title", () => {
    render(<ProductForm statusFormState="add" product={undefined} />);
    expect(screen.getByText("Adicionar Produto")).toBeInTheDocument();
  });

  it("renders component with 'Editar Produto' title", () => {
    render(<ProductForm statusFormState="edit" product={mockProduct} />);
    expect(screen.getByText("Editar Produto")).toBeInTheDocument();
  });

  it("submits new product and shows success message", async () => {
    const mockAddProductMutation = {
      mutateAsync: jest.fn(),
    };

    const mockQueryClientInvalidateQueries = jest.fn();
    const mockPush = jest.fn();

    jest
      .spyOn(require("@tanstack/react-query"), "useMutation")
      .mockReturnValueOnce(mockAddProductMutation);
    jest
      .spyOn(require("@tanstack/react-query"), "useQueryClient")
      .mockReturnValue({
        invalidateQueries: mockQueryClientInvalidateQueries,
      });
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      push: mockPush,
    });

    render(<ProductForm statusFormState="add" product={undefined} />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByLabelText("Preço"), {
      target: { value: "20.99" },
    });
    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "Product description" },
    });

    fireEvent.click(screen.getByText("Enviar"));

    await waitFor(() => {
      expect(mockAddProductMutation.mutateAsync).toHaveBeenCalledWith({
        name: "New Product",
        price: "20.99",
        description: "Product description",
      });

      expect(mockQueryClientInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["products"],
      });

      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
