import React from "react";
import { Button, IconButton } from "@mui/material";
import { useThemeMode } from "../providers/ThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ToggleThemeButton = () => {
  const { mode, setThemeMode } = useThemeMode();

  const toggleTheme = () => {
    setThemeMode(mode === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={toggleTheme} size="large">
      <DarkModeIcon />
    </IconButton>
  );
};

export default ToggleThemeButton;
