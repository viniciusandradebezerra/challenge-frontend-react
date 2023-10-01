import React from "react";
import { Providers } from "@utils";
import { Container } from "@mui/material";
import { Header } from "@components";
import { SnackBar } from "@ui";

export const metadata = {
  title: "Challenge frontend",
  description: "Challenge frontend next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Container fixed>
          <Header />
          <Providers>{children}</Providers>
        </Container>
        <SnackBar />
      </body>
    </html>
  );
}
