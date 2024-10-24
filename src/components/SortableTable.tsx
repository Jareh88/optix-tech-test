import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { SortableTableHead } from "./SortableTableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import { Data, Order } from "../App";
import { getComparator } from "../helpers/MUI";

interface SortableTableProps {
  rows: Data[];
  categories: { id: string; name: string }[] | null;
  selected: string | null;
  handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  orderBy: keyof Data;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof Data>>;
  handleSort: (property: keyof Data) => void;
}

export const SortableTable: React.FC<SortableTableProps> = ({
  rows,
  categories,
  selected,
  handleClick,
  order,
  setOrder,
  orderBy,
  setOrderBy,
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
        {sortedRows.map((row: any) => {
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