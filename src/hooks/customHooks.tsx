// Would normally split these out to their own files.
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
import { useBoolean } from "react-use";

// For use when just running npm start, in real world this would be import.meta.env env variable for different environments.
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useFetchData = <T,>(
  url: string,
  initialData: T,
  dependencies: any[] = [] // add in dependencies so we can refetch easily from wherever when needed
) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, toggleIsLoading] = useBoolean(false); // Can't believe I've never seen useBoolean before.
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    toggleIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const jsonData: T = await response.json();
      setData(jsonData);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(`${error.message}`);
      }
    } finally {
      toggleIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, isLoading, error, refetch: fetchData };
};

export const useMovies = () => {
  return useFetchData<Data[]>(`${apiUrl}/movies`, []);
};

export const useMovieCompanies = () => {
  return useFetchData<MovieCompanyData[]>(`${apiUrl}/movieCompanies`, []);
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
      const response = await fetch(`${apiUrl}/submitReview`, {
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
