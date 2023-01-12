import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/router";
import DarkToggleButton from "../DarkToggleButton/DarkToggleButton";
import LowerNavbar from "../Navbar/LowerNavbar/LowerNavbar";
import UpperNavbar from "../Navbar/UpperNavbar/UpperNavbar";
import Sidebar from "../Sidebar/Sidebar";
import ThemeSettings from "../ThemeSettings/ThemeSettings";

const Layout = ({ children }) => {
  const { darkTheme, screenSize } = useStateContext();
  const { pathname } = useRouter();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? "dark" : "light";
  return (
    <div id={darkTheme ? "dark" : "light"}>
      {screenSize >= 900 && (
        <nav>
          <UpperNavbar />
          <div className="empty_div"></div>
        </nav>
      )}
      <DarkToggleButton />
      <ThemeSettings />
      {pathname.includes("/dashboard") && <Sidebar />}

      <main>{children}</main>

      <footer>
        {screenSize < 900 && (
          <div className={`${conditionalMode} empty_div`}></div>
        )}

        {screenSize < 900 && <LowerNavbar />}
      </footer>
    </div>
  );
};

export default Layout;
