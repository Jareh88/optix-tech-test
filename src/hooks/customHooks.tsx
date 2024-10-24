import { useState, useEffect, useCallback } from "react";
import {
  Data,
  initialOrder,
  initialOrderByState,
  MovieCompanyData,
  Order,
  SelectedRowData,
} from "../App";
import { UseFormSetError } from "react-hook-form";

export const useFetchData = <T,>(
  url: string,
  initialData: T,
  dependencies: any[] = [] // add in dependencies so we can refetch easily from wherever when needed
) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const jsonData: T = await response.json();
      setData(jsonData);
    } catch (error) {
      setSuccess(false);
      setError("Error fetching data");
    } finally {
      setSuccess(true);
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, isLoading, error, success, refetch: fetchData };
};

export const useMovies = () => {
  return useFetchData<Data[]>("http://localhost:3000/movies", []);
};

export const useMovieCompanies = () => {
  return useFetchData<MovieCompanyData[]>(
    "http://localhost:3000/movieCompanies",
    []
  );
};

export const useSelectedRow = (initialState: SelectedRowData) => {
  const [selectedRowData, setSelectedRowData] =
    useState<SelectedRowData>(initialState);

  const handleRowSelection = (rows: Data[], id: string) => {
    const selectedRow = rows.find((row) => row.id === id);
    if (selectedRowData.id === id) {
      setSelectedRowData(initialState);
    } else {
      setSelectedRowData(
        selectedRow ? { id, title: selectedRow.title } : initialState
      );
    }
  };

  return { selectedRowData, setSelectedRowData, handleRowSelection };
};

export const useSorting = () => {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [orderBy, setOrderBy] = useState<keyof Data>(initialOrderByState);

  const handleSort = (property: keyof Data) => {
    setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  const resetSorting = () => {
    setOrder(initialOrder);
    setOrderBy(initialOrderByState);
  };

  return { order, setOrder, orderBy, setOrderBy, handleSort, resetSorting };
};

interface FormData {
  review: string;
}

export const useHandleSubmit = (
  setSuccessMessage: (message: string) => void,
  setError: UseFormSetError<FormData>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { review: string }) => {
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/submitReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const jsonData = await response.json();
      setSuccessMessage(jsonData.message);
    } catch (error) {
      // Should probably work this into its own area of state so we're not using mucky specific types
      setError("root.serverError", {
        type: "manual",
        message: "Submission Error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};
