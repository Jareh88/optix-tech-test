import { Button } from "@mui/material";

interface RefreshButtonProps {
  buttonText: string;
  resetSelection: () => void;
  resetSorting: () => void;
  isLoading: boolean;
  refetchMovies: () => void;
  refetchMovieCompanies: () => void;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  buttonText,
  resetSelection,
  resetSorting,
  isLoading,
  refetchMovies,
  refetchMovieCompanies,
}) => {
  return (
    <Button
      onClick={() => {
        resetSelection();
        resetSorting();
        // Should probably combine these
        refetchMovieCompanies();
        refetchMovies();
      }}
      variant="contained"
      disabled={isLoading}
    >
      {buttonText}
    </Button>
  );
};
