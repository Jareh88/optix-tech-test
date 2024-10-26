import { Box } from "@mui/material";
import ToggleThemeButton from "./ToggleThemeButton";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <ToggleThemeButton />
    </Box>
  );
};
