import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useStateContext } from "../../../context/ContextProvider";
import routes from "../../../routes/routes";
import styles from "./UpperNavbar.module.css";

const UpperNavbar = () => {
  const { pageURL } = useStateContext();

  return (
    <div className={styles.nav_sec}>
      <Container maxWidth="lg">
        <div className={styles.nav_brand}>
          <Image src="" alt="" />
        </div>
        <div className={styles.nav_links}>
          {routes.map((path, idx) => (
            <span
              key={idx}
              className={pageURL === path.to ? styles.activeLink : styles.link}
            >
              <Link href={path.to}>{path.name}</Link>
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UpperNavbar;
