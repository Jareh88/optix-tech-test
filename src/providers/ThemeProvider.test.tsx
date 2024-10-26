import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useThemeMode, MainThemeProvider } from "./ThemeProvider";

const TestComponent = () => {
  const { mode, setThemeMode } = useThemeMode();
  return (
    <div>
      <span data-testid="current-mode">Current Mode: {mode}</span>
      <button
        data-testid="toggle-mode-button"
        onClick={() => setThemeMode(mode === "light" ? "dark" : "light")}
      >
        Toggle Mode
      </button>
    </div>
  );
};

describe("<MainThemeProvider>", () => {
  it("should render component and display initial mode as dark", () => {
    render(
      <MainThemeProvider>
        <TestComponent />
      </MainThemeProvider>
    );

    expect(screen.getByTestId("current-mode")).toHaveTextContent(
      "Current Mode: dark"
    );
  });

  it("should toggle between light and dark modes", () => {
    render(
      <MainThemeProvider>
        <TestComponent />
      </MainThemeProvider>
    );

    const toggleButton = screen.getByTestId("toggle-mode-button");
    const modeText = screen.getByTestId("current-mode");

    expect(modeText).toHaveTextContent("Current Mode: dark");

    fireEvent.click(toggleButton);
    expect(modeText).toHaveTextContent("Current Mode: light");

    fireEvent.click(toggleButton);
    expect(modeText).toHaveTextContent("Current Mode: dark");
  });
});
