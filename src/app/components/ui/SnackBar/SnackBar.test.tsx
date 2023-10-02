import React from "react";
import { render, screen } from "@testing-library/react";
import { SnackBar as SnackBarComponent } from "./SnackBar";

jest.mock("../../../store", () => ({
  useToastMessage: () => ({
    message: { title: "Test Message", type: "success" },
  }),
}));

it("displays the message in the Snackbar", () => {
  render(<SnackBarComponent />);

  const snackbarElement = screen.getByRole("alert");
  expect(snackbarElement).toBeInTheDocument();

  expect(screen.getByText("Test Message")).toBeInTheDocument();
});
