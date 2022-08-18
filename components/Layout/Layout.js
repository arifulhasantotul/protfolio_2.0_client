import React from "react";
import UpperNavbar from "../Navbar/UpperNavbar/UpperNavbar";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <UpperNavbar />
        <div className="empty_div"></div>
      </nav>
      <main>{children}</main>

      <footer></footer>
    </>
  );
};

export default Layout;
