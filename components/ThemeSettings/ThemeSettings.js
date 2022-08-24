import React from "react";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import { useStateContext } from "../../context/ContextProvider";
import { themeColors } from "./themeColor";
import styles from "./ThemeSettings.module.css";

const ThemeSettings = () => {
  const { darkTheme, currentColor, setColor } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${conditionalMode} ${styles.theme_sec}`}>
      <div className={styles.theme_wrapper}>
        <p className={styles.color_options}>Theme Colors</p>
        <div className={styles.color_sec}>
          {themeColors.map((item, idx) => (
            <button
              key={idx}
              type="button"
              title={item?.name}
              className={styles.theme_btn}
              style={{
                background: item?.color,
              }}
              onClick={() => setColor(item?.color)}
            >
              {item?.color === currentColor && (
                <BsIcons.BsCheck className={styles.checkIcon} />
              )}
            </button>
          ))}
        </div>
      </div>
      <div
        title="Settings"
        className={styles.setting_icon}
        style={{
          background: currentColor,
        }}
      >
        <FiIcons.FiSettings className={styles.settings} />
      </div>
    </div>
  );
};

export default ThemeSettings;
