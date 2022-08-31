import Image from "next/image";
import React from "react";
import { useStateContext } from "../../../context/ContextProvider";
import styles from "./HomeBannerRight.module.css";
import PicSrc from "./own.jpg";

const HomeBannerRight = () => {
  const { darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={conditionalMode}>
      <div className={styles.fig_div}>
        <div className={styles.figure}>
          <Image
            src={PicSrc}
            alt="Profile picture"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBannerRight;
