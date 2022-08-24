import React from "react";
import Switch from "react-switch";
import { useStateContext } from "../../context/ContextProvider";
import MoonIcon from "../CustomIcons/MoonIcon";
import SunIcon from "../CustomIcons/SunIcon";
import styles from "./DarkToggleButton.module.css";

const DarkToggleButton = () => {
  const { darkTheme, toggleDarkTheme } = useStateContext();
  return (
    <div className={styles.dark_toggle_div} title="Dark mode">
      <Switch
        checked={darkTheme}
        onChange={() => toggleDarkTheme(darkTheme)}
        offColor="#fff"
        onColor="#d1d9e6"
        offHandleColor="#d1d9e6"
        onHandleColor="#3c3e41"
        uncheckedIcon={<MoonIcon />}
        checkedIcon={<SunIcon />}
      />
    </div>
  );
};

export default DarkToggleButton;
