import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/ThemeSettings.module.css";
import { BsCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { themeColors } from "./themeColor";

const ThemeSettings = () => {
  const { darkTheme, currentColor, sidebar, setSidebar, setColor } =
    useStateContext();

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const handleColorBtn = (name, color) => {
    setColor(name, color);
    toggleSidebar();
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  const conditionalSidebar = sidebar ? "" : styles.inactive;

  return (
    <>
      <div
        className={`${conditionalMode} ${styles.theme_sec} ${conditionalSidebar}`}
      >
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
                onClick={() => handleColorBtn(item?.name, item?.color)}
              >
                {item?.color === currentColor && (
                  <BsCheck className={styles.checkIcon} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        title="Settings"
        className={styles.setting_icon}
        style={{
          background: currentColor,
        }}
        onClick={toggleSidebar}
      >
        <FiSettings className={styles.settings} />
      </div>
    </>
  );
};

export default ThemeSettings;
