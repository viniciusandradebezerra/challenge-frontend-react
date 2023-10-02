"use client";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Typography } from "@mui/material";
import { TProductDto } from "@types";
import { TFormData, IProductFormProps } from "./ProductForm.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductsApi } from "@services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToastMessage } from "@store";

export const ProductForm = ({
  statusFormState,
  product,
}: IProductFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const addProductMutation = useMutation(ProductsApi.addProduct);
  const editProductMutation = useMutation(ProductsApi.editProduct);
  const title = statusFormState === "add" ? "Adicionar" : "Editar";
  const { setMessage } = useToastMessage();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const defaultValues: TProductDto = {
    name: product?.name!,
    description: product?.description!,
    price: product?.price!,
  };

  useEffect(() => {
    product && reset(defaultValues);
  }, [product]);

  const onSubmit = async (data: TProductDto) => {
    try {
      data.price = data.price.replace(",", "");

      if (statusFormState === "add") {
        await addProductMutation.mutateAsync(data);
        queryClient.invalidateQueries({ queryKey: ["products"] });
        router.push("/");
        setMessage({
          title: "Produto adicionado com sucesso!",
          type: "success",
        });
      }

      if (statusFormState === "edit") {
        const dataEditProduct = {
          ...product,
          ...data,
        };
        await editProductMutation.mutateAsync(dataEditProduct);
        queryClient.invalidateQueries({ queryKey: ["edit-products"] });
        router.push("/");
        setMessage({ title: "Produto editado com sucesso!", type: "success" });
      }
    } catch (error) {
      setMessage({ title: "Algo aconteceu, tente novamente!", type: "error" });
      console.error("Error: ", error);
    }
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          {title} Produto
        </Typography>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Nome é obrigatório" }}
          render={({ field }) => (
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue=""
          rules={{
            required: "Preço é obrigatório",
            pattern: {
              value: /^(\d+[\.]?\d*|\.\d+)$/,
              message:
                "Digite um número válido (utilize pontos para casas decimais)",
            },
          }}
          render={({ field }) => (
            <TextField
              label="Preço"
              variant="outlined"
              fullWidth
              margin="normal"
              {...field}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Descrição é obrigatória" }}
          render={({ field }) => (
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              margin="normal"
              {...field}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </Container>
  );
};
