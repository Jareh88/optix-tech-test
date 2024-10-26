import React from "react";
import "@testing-library/jest-dom";
import { SortableTableHead } from "./SortableTableHead";
import { render } from "@testing-library/react";
import { Table } from "@mui/material";

describe("<SortableTableHead>", () => {
  it("should render component", () => {
    render(
      <Table>
        <SortableTableHead
          order="asc"
          orderBy="title"
          onRequestSort={jest.fn()}
        />
      </Table>
    );
  });
  // Tests here
});
