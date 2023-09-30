"use client";
import { useQuery } from "@tanstack/react-query";
import { TProductDto } from "@types";
import { ProductsApi } from "@services";
import { Typography } from "@mui/material";
import { ProductTable } from "@components";

export default function Home() {
  const { data, isLoading, isError } = useQuery<TProductDto[]>({
    queryKey: ["products"],
    queryFn: () => ProductsApi.getAllProducts(),
    staleTime: 5 * 1000,
  });

  console.log(data);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError) return <Typography>Client or Sever Error...</Typography>;

  return (
    <>
      <ProductTable products={data} />
    </>
  );
}
