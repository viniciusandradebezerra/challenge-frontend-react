
import React from "react";
import { Providers } from "@utils";
import { Container, Paper } from "@mui/material";
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
        <Container component="main" maxWidth="md" sx={{ mb: 4, mt: 4 }}>
          <Paper
            elevation={3}
            square={false}
            variant="elevation"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, maxHeight: "fit-content" }}
          >
            <Header />
            <Providers>{children}</Providers>
          </Paper>
        </Container>
        <SnackBar/>
      </body>
    </html>
  );
}
