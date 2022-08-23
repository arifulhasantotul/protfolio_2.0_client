import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import DarkToggleButton from "../DarkToggleButton/DarkToggleButton";
import LowerNavbar from "../Navbar/LowerNavbar/LowerNavbar";
import UpperNavbar from "../Navbar/UpperNavbar/UpperNavbar";

const Layout = ({ children }) => {
  const { darkTheme } = useStateContext();
  return (
    <div id={darkTheme ? "dark" : "light"}>
      <nav>
        <UpperNavbar />
        <div className="empty_div"></div>
      </nav>
      <DarkToggleButton />
      <main>{children}</main>

      <footer>
        <div className="empty_div"></div>
        <LowerNavbar />
      </footer>
    </div>
  );
};

export default Layout;
