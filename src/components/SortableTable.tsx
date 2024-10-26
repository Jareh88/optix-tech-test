import { SortableTableHead } from "./SortableTableHead";
import { Data, Order } from "../App";
import { getComparator } from "../helpers/MUI";
import { Checkbox, Table, TableBody, TableCell, TableRow } from "@mui/material";

interface SortableTableProps {
  rows: Data[];
  categories: { id: string; name: string }[] | null;
  selected: string | null;
  handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
  order: Order;
  orderBy: keyof Data;
  handleSort: (property: keyof Data) => void;
}

export const SortableTable: React.FC<SortableTableProps> = ({
  rows,
  categories,
  selected,
  handleClick,
  order,
  orderBy,
  handleSort,
}) => {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    handleSort(property);
  };

  const sortedRows = rows.sort((a: Data, b: Data) => {
    if (orderBy === "reviews") {
      const avgA =
        a.reviews.reduce((acc, val) => acc + val, 0) / a.reviews.length;
      const avgB =
        b.reviews.reduce((acc, val) => acc + val, 0) / b.reviews.length;
      return order === "asc" ? avgA - avgB : avgB - avgA;
    }
    return getComparator(order, orderBy)(a, b);
  });

  return (
    <Table>
      <SortableTableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      <TableBody>
        {sortedRows.map((row: Data) => {
          const isItemSelected = selected === row.id;
          return (
            <TableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
              onClick={(event) => handleClick(event, row.id)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>
                <Checkbox checked={isItemSelected} />
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>
                {(
                  row.reviews.reduce((acc: any, i: any) => acc + i, 0) /
                  row.reviews.length
                )
                  .toFixed(1)
                  ?.toString()
                  .substring(0, 3)}{" "}
              </TableCell>
              <TableCell>
                {categories &&
                  categories.find((f: any) => f.id === row.filmCompanyId)?.name}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
