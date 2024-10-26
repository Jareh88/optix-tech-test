import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SubmitReviewForm } from "./SubmitReviewForm";

describe("<SubmitReviewForm>", () => {
  it("should render component", () => {
    render(
      <SubmitReviewForm
        successMessage=""
        setSuccessMessage={jest.fn()}
        selectedRow={"0"}
      />
    );
  });
  // Tests here
});
