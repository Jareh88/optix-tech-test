import React, { useState } from "react";
import { easeIn, easeOut } from "polished";
import { useBoolean } from "react-use";
import { createReducer } from "@reduxjs/toolkit";
import CssBaseline from "@mui/material/CssBaseline";
import { SortableTable } from "./components/SortableTable";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ReviewSection } from "./components/ReviewSection";
import { RefreshButton } from "./components/RefreshButton";
import {
  useMovieCompanies,
  useMovies,
  useSelectedRow,
  useSorting,
} from "./hooks/customHooks";

export interface Data {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

export interface MovieCompanyData {
  id: string;
  name: string;
}

type APIData = Data[] | MovieCompanyData[] | null;

export type SelectedRow = string | null;

export type Order = "asc" | "desc";

export const optixApiGet = async <T extends APIData>(
  url: string,
  cb: React.Dispatch<React.SetStateAction<T>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data: T = await response.json();
    cb(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setIsLoading(false);
  }
};

export interface SelectedRowData {
  id: string | null;
  title: string;
}

export const initialSelectedRowState = { id: null, title: "No Movie Selected" };

export const initialOrder = "asc";
export const initialOrderByState = "title";

export const App = () => {
  const {
    data: rows,
    isLoading: isLoadingMovies,
    refetch: refetchMovies,
    error: moviesFetchError,
    success: moviesFetchSuccess,
  } = useMovies();
  const {
    data: movieCompanies,
    isLoading: isLoadingCompanies,
    refetch: refetchMovieCompanies,
    error: movieCompaniesFetchError,
    success: movieCompaniesFetchSuccess,
  } = useMovieCompanies();
  const { selectedRowData, setSelectedRowData, handleRowSelection } =
    useSelectedRow(initialSelectedRowState);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { order, setOrder, orderBy, setOrderBy, handleSort, resetSorting } =
    useSorting();

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    setSuccessMessage("");
    handleRowSelection(rows, id);
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h2" gutterBottom>
        Welcome to Movie database!
      </Typography>
      <Box>
        {/* (Big fan of v2 grid in MUI v6) */}
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <Typography variant="h4" component="h3" mb="1rem">
              Total movies displayed:{" "}
              {movieCompaniesFetchError || moviesFetchError
                ? "N/A"
                : rows.length}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end">
              <RefreshButton
                buttonText={"Refresh"}
                resetSelection={() =>
                  setSelectedRowData({ id: null, title: "No Movie Selected" })
                }
                resetSorting={resetSorting}
                isLoading={isLoadingMovies || isLoadingCompanies}
                refetchMovies={refetchMovies}
                refetchMovieCompanies={refetchMovieCompanies}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* There was some issue with a 500 error on some page refreshes I couldn't get to the bottom of...
      Something to do with express on localhost perhaps? Too many requests at once? */}
      {movieCompaniesFetchError || moviesFetchError ? (
        <>
          <Typography variant="body1" color="error">
            Error fetching data!
          </Typography>
        </>
      ) : isLoadingMovies || isLoadingCompanies ? (
        <>
          <CircularProgress />
          <Typography variant="body1">Fetching table...</Typography>
        </>
      ) : (
        <SortableTable
          rows={rows}
          categories={movieCompanies}
          selected={selectedRowData.id}
          handleClick={handleClick}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          handleSort={handleSort}
        />
      )}

      <ReviewSection
        selectedRowData={selectedRowData}
        setSelectedRowData={setSelectedRowData}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </Container>
  );
};
