import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ReviewSection } from "./ReviewSection";

const testRowData = {
  id: "1",
  title: "Test Row",
};

describe("<ReviewSection>", () => {
  it("should render component", () => {
    render(
      <ReviewSection
        selectedRowData={testRowData}
        setSelectedRowData={jest.fn()}
        successMessage="Success"
        setSuccessMessage={jest.fn()}
      />
    );
  });
  // Tests here
});
