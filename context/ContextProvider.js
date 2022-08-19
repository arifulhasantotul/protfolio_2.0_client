import React, { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);

  const [bottomNavbar, setBottomNavbar] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);

  const [themeSettings, setThemeSettings] = useState(false);

  const { pathname } = useRouter();
  console.log(pathname);

  const [pageURL, setPageURL] = useState("");

  const setTheme = (e) => {
    setDarkTheme(e.target.checked);

    localStorage.setItem("portfolioDarkTheme", e.target.checked);
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    const darkTheme = localStorage.getItem("portfolioDarkTheme") || false;
    setDarkTheme(darkTheme);

    setPageURL(pathname);
  }, [pathname]);

  return (
    <StateContext.Provider
      value={{
        screenSize,
        setScreenSize,
        bottomNavbar,
        setBottomNavbar,
        darkTheme,
        setDarkTheme,
        setTheme,
        themeSettings,
        setThemeSettings,
        pageURL,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
