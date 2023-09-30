"use client";

import React from "react";
import { QueryClientProvider, QueryClient, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <Hydrate>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}