import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const applyTheme = (value) => {
      if (value === "dark") {
        root.classList.add("dark");
      } else if (value === "light") {
        root.classList.remove("dark");
      } else {
        if (media.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme(theme);

    localStorage.setItem("theme", theme);

    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}