import React from "react";
import LowerNavbar from "../Navbar/LowerNavbar/LowerNavbar";
import UpperNavbar from "../Navbar/UpperNavbar/UpperNavbar";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <UpperNavbar />
        <div className="empty_div"></div>
      </nav>
      <main>{children}</main>

      <footer>
        <div className="empty_div"></div>
        <LowerNavbar />
      </footer>
    </>
  );
};

export default Layout;
