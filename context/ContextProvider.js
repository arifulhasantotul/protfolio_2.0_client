import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);

  const [bottomNavbar, setBottomNavbar] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  return (
    <StateContext.Provider
      value={{
        screenSize,
        setScreenSize,
        bottomNavbar,
        setBottomNavbar,
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
