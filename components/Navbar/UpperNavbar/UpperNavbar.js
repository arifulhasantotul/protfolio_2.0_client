import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Switch from "react-switch";
import { useStateContext } from "../../../context/ContextProvider";
import logo from "../../../public/logo.jpg";
import routes from "../../../routes/routes";
import MoonIcon from "../../CustomIcons/MoonIcon";
import SunIcon from "../../CustomIcons/SunIcon";
import styles from "./UpperNavbar.module.css";

const UpperNavbar = () => {
  const { pageURL, darkTheme, toggleDarkTheme } = useStateContext();

  // css conditionalClass for dark mode
  const conditionalClass = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalClass} ${styles.nav_sec}`}>
      <Container maxWidth="xl">
        <div className={styles.nav_wrapper}>
          <div className={styles.nav_brand}>
            <Image src={logo} alt="logo" layout="fill" objectFit="cover" />
          </div>
          <Switch
            checked={darkTheme}
            onChange={() => toggleDarkTheme(darkTheme)}
            offColor="#fff"
            onColor="#d1d9e6"
            offHandleColor="#ecf0f3"
            onHandleColor="#3c3e41"
            uncheckedIcon={<MoonIcon />}
            checkedIcon={<SunIcon />}
          />
          <div className={styles.nav_links}>
            {routes.map((path, idx) => (
              <Link key={idx} href={path.to}>
                <span
                  className={
                    pageURL === path.to ? styles.activeLink : styles.link
                  }
                  title={`Go to: ${path.to}`}
                >
                  <span title={path.name} className={styles.link_icon}>
                    {path.icon}
                  </span>
                  <span className={styles.link_name}>{path.name}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpperNavbar;
