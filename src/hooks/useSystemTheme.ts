import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useSystemTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme) {
      return savedTheme;
    }

    // Check for system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
