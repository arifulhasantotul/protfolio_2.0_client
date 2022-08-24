import React from "react";
import * as FiIcons from "react-icons/fi";
import { useStateContext } from "../../context/ContextProvider";
import styles from "./ThemeSettings.module.css";

const ThemeSettings = () => {
  const { pageURL, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${conditionalMode} ${styles.theme_sec}`}>
      <div className={styles.setting_icon}>
        <FiIcons.FiSettings />
      </div>
      <div className={styles.theme_wrapper}></div>
    </div>
  );
};

export default ThemeSettings;
