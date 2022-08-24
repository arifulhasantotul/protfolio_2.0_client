import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useStateContext } from "../../../context/ContextProvider";
import logo from "../../../public/logo.jpg";
import routes from "../../../routes/routes";

import styles from "./UpperNavbar.module.css";

const UpperNavbar = () => {
  const { pageURL, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.nav_sec}`}>
      <Container maxWidth="xl">
        <div className={styles.nav_wrapper}>
          <div className={styles.nav_brand}>
            <Image src={logo} alt="logo" layout="fill" objectFit="cover" />
          </div>

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
