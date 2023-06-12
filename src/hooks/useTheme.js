import { useState, useEffect } from "react";

export default function useTheme() {
  const light = "emerald";
  const dark = "forest";

  const initTheme = () => {
    const localTheme = window.localStorage.getItem("theme");
    return localTheme ? localTheme : dark;
  };
  const [theme, setTheme] = useState(initTheme());

  const toggleTheme = () => {
    const newTheme = theme === dark ? light : dark;
    document.querySelector("#root").setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.querySelector("#root").setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === dark;
  return { theme, toggleTheme, isDark };
}
