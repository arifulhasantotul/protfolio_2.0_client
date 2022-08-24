import React, { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);

  const [bottomNavbar, setBottomNavbar] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);

  const [currentColor, setCurrentColor] = useState("#FD4520");

  const [themeSettings, setThemeSettings] = useState(false);

  const { pathname } = useRouter();

  const [pageURL, setPageURL] = useState("");

  const toggleDarkTheme = (prevState) => {
    setDarkTheme(!prevState);

    localStorage.setItem("portfolioDarkTheme", !prevState);
  };

  const setColor = (color) => {
    setCurrentColor(color);

    localStorage.setItem("portfolioThemeColor", color);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolioDarkTheme") || false;
    const isTrue = savedTheme === "true" ? true : false;
    setDarkTheme(isTrue);

    const savedColor = localStorage.getItem("portfolioThemeColor") || "#FD4520";
    setCurrentColor(savedColor);

    setPageURL(pathname);

    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize, pathname]);

  return (
    <StateContext.Provider
      value={{
        screenSize,
        setScreenSize,
        bottomNavbar,
        setBottomNavbar,
        darkTheme,
        setDarkTheme,
        toggleDarkTheme,
        themeSettings,
        setThemeSettings,
        pageURL,
        currentColor,
        setCurrentColor,
        setColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
