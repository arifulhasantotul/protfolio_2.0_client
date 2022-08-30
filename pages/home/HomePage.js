import { Container } from "@mui/system";
import React from "react";
import HomeBannerLeft from "../../components/HomeComp/HomeBannerLeft/HomeBannerLeft";
import { useStateContext } from "../../context/ContextProvider";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.home_page} ${conditionalMode}`}>
      <Container maxWidth="xl">
        <HomeBannerLeft />
      </Container>
    </div>
  );
};

export default HomePage;
