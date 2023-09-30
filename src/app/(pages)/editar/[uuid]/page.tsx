'use client'
import { TProductDto } from "@types";
import { ProductForm } from "@components";
import { useQuery } from "@tanstack/react-query";
import { ProductsApi } from "@services";
import { useParams } from "next/navigation";
import { Typography } from "@mui/material";

const Editar = () => {
  const params = useParams();
  const { uuid } = params;

  const { data, isLoading, isError } = useQuery<{product: TProductDto}>({
    queryKey: ["edit-products"],
    queryFn: () => ProductsApi.getProductById(String(uuid)),
    staleTime: 5 * 1000,
  });

  if(isLoading) return <Typography>Loading...</Typography>

  if(isError) return <Typography>Client or Sever Error...</Typography>

  return (
    <>
        <ProductForm product={data.product} statusFormState={'edit'} />
    </>
  );
}

export default Editar
