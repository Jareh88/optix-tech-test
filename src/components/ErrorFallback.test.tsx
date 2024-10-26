import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ErrorFallback } from "./ErrorFallback";

describe("<ErrorFallback>", () => {
  it("should render component", () => {
    render(<ErrorFallback errorMessage="Test error" />);
  });
  // Tests here
});
