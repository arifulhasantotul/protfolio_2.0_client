import { CURRENT_USER, LOGIN_USER } from "@/services/graphql/queries";
import { failedToast } from "@/services/utils/toasts";
import client from "apollo-client";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const StateContext = createContext();

const getUser = async (
  email,
  password,
  userIP,
  onMobile,
  userPlatform,
  userAgent,
  ipRegion,
  ipCountry
) => {
  if (!email || !password) return;

  const { data } = await client.query({
    query: LOGIN_USER,
    variables: {
      email: email,
      password: password,
      userIP: userIP,
      onMobile: onMobile,
      userPlatform: userPlatform,
      userAgent: userAgent,
      ipRegion: ipRegion,
      ipCountry: ipCountry,
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
  const [cookies, setCookie, removeCookie] = useCookies(["portfolio_2_0"]);
  const accessToken = cookies["portfolio_2_0"];

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

  const backend_url =
    process.env.NEXT_PUBLIC_RUNNING === "dev"
      ? process.env.NEXT_PUBLIC_DEV_SERVER
      : process.env.NEXT_PUBLIC_PROD_SERVER;

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

  const customLoginUser = (
    email,
    password,
    userIP,
    onMobile,
    userPlatform,
    userAgent,
    ipRegion,
    ipCountry
  ) => {
    if (!email || !password)
      return failedToast(darkTheme, "Please fill all fields");

    const foundUser = getUser(
      email,
      password,
      userIP,
      onMobile,
      userPlatform,
      userAgent,
      ipRegion,
      ipCountry
    );
    if (!foundUser) return;
    return foundUser;
  };

  const handleLogout = () => {
    removeCookie("portfolio_2_0");
    localStorage.removeItem("portfolioIdToken");
    window.location.replace("/");
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

    if (!accessToken) localStorage.removeItem("portfolioIdToken");

    if (screenSize <= 900) {
      setSidebar(false);
      setAdminSidebar(false);
    }

    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        accessToken,
        backend_url,
        handleLogout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
