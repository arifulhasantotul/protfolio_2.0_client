import { CURRENT_USER, LOGIN_USER } from "@/services/graphql/queries";
import { failedToast } from "@/services/utils/toasts";
import client from "apollo-client";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

const getUser = async (email, password) => {
  if (!email || !password) return;

  const { data } = await client.query({
    query: LOGIN_USER,
    variables: {
      email: email,
      password: password,
    },
  });
  return data.loginUser;
};

const me = async () => {
  const { data } = await client.query({
    query: CURRENT_USER,
  });
  return data.currentUser;
};

const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);

  const [sidebar, setSidebar] = useState(false);

  const [adminSidebar, setAdminSidebar] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);

  const [currentColor, setCurrentColor] = useState("#FD4520");

  const [currentColorName, setCurrentColorName] = useState("orange");

  const [themeSettings, setThemeSettings] = useState(false);

  const { pathname } = useRouter();

  const [pageURL, setPageURL] = useState("");

  const [loginUserData, setLoginUserData] = useState(null);

  const [isUserLoading, setIsUserLoading] = useState(true);

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

  const customLoginUser = (email, password) => {
    if (!email || !password)
      return failedToast(darkTheme, "Please fill all fields");

    const foundUser = getUser(email, password);
    if (!foundUser) return;
    return foundUser;
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
      setAdminSidebar(false);
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
        adminSidebar,
        setAdminSidebar,
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
        customLoginUser,
        loginUserData,
        setLoginUserData,
        isUserLoading,
        setIsUserLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
