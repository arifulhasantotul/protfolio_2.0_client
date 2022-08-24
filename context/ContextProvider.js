import React, { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);

  const [sidebar, setSidebar] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);

  const [currentColor, setCurrentColor] = useState("#FD4520");

  const [currentColorName, setCurrentColorName] = useState("orange");

  const [themeSettings, setThemeSettings] = useState(false);

  const { pathname } = useRouter();

  const [pageURL, setPageURL] = useState("");

  const toggleDarkTheme = (prevState) => {
    setDarkTheme(!prevState);

    localStorage.setItem("portfolioDarkTheme", !prevState);
  };

  const setColor = (name, color) => {
    setCurrentColor(color);
    setCurrentColorName(name);

    localStorage.setItem("portfolioThemeColor", color);
    localStorage.setItem("portfolioThemeColorName", name);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolioDarkTheme") || false;
    const isTrue = savedTheme === "true" ? true : false;
    setDarkTheme(isTrue);

    const savedColor = localStorage.getItem("portfolioThemeColor") || "#FD4520";
    setCurrentColor(savedColor);

    const savedColorName =
      localStorage.getItem("portfolioThemeColorName") || "orange";
    setCurrentColorName(savedColorName);

    setPageURL(pathname);

    if (screenSize <= 900) {
      setSidebar(false);
    }

    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize, setScreenSize, pathname]);

  return (
    <StateContext.Provider
      value={{
        screenSize,
        setScreenSize,
        sidebar,
        setSidebar,
        darkTheme,
        setDarkTheme,
        toggleDarkTheme,
        themeSettings,
        setThemeSettings,
        pageURL,
        currentColor,
        setCurrentColor,
        setColor,
        currentColorName,
        setCurrentColorName,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
