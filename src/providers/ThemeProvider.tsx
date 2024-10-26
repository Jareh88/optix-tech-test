import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";

// Create a context for the theme mode
export type ThemeModeContext = {
  mode: "light" | "dark";
  setThemeMode: (mode: "light" | "dark") => void;
};

const Context = createContext<ThemeModeContext>({} as ThemeModeContext);

type MainThemeProviderProps = {
  mode?: PaletteMode;
  children: React.ReactNode;
};

export const MainThemeProvider = ({
  mode: initialMode,
  children,
}: MainThemeProviderProps) => {
  const [mode, setThemeMode] = useState<PaletteMode>(initialMode || "dark");

  useEffect(() => {
    if (initialMode) {
      setThemeMode(initialMode);
    }
  }, [initialMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <Context.Provider value={{ mode, setThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
};

export const useThemeMode = () => useContext(Context);
