import MoonIcon from "@/components/CustomIcons/MoonIcon";
import SunIcon from "@/components/CustomIcons/SunIcon";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/DarkToggleButton.module.css";
import Switch from "react-switch";

const DarkToggleButton = () => {
  const { darkTheme, currentColor, toggleDarkTheme } = useStateContext();
  return (
    <div
      className={styles.dark_toggle_div}
      title="Dark mode"
      style={{
        border: `3px solid ${currentColor}`,
      }}
    >
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
