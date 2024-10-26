import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { RefreshButton } from "./RefreshButton";

describe("<RefreshButton>", () => {
  it("should render component", () => {
    render(
      <RefreshButton
        buttonText="Refresh"
        resetSelection={jest.fn()}
        resetSorting={jest.fn()}
        isLoading={false}
        refetchMovies={jest.fn()}
        refetchMovieCompanies={jest.fn()}
      />
    );
  });
  // Tests here
});
