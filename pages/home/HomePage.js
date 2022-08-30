import { Container, Grid } from "@mui/material";
import React from "react";
import HomeBannerLeft from "../../components/HomeComp/HomeBannerLeft/HomeBannerLeft";
import HomeBannerRight from "../../components/HomeComp/HomeBannerRight/HomeBannerRight";
import { useStateContext } from "../../context/ContextProvider";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.home_page} ${conditionalMode}`}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <HomeBannerLeft />
          </Grid>
          <Grid item xs={12} md={6}>
            <HomeBannerRight />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
