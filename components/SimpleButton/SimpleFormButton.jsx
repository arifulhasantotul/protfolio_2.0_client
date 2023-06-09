import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/SimpleButton.module.css";
import { useEffect, useState } from "react";

const SimpleFormButton = ({
  name,
  type,
  onClick,
  children,
  tooltip,
  disabled,
  leftIcon,
}) => {
  const { currentColor, darkTheme } = useStateContext();

  const bgColor = darkTheme ? "#212428" : "#ecf0f3";

  const [background, setBackground] = useState(bgColor);

  const [fontColor, setFontColor] = useState(currentColor);

  const hoverStyle = (color, bg) => {
    setBackground(bg);
    setFontColor(color);
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  useEffect(() => {
    setBackground(bgColor);
    setFontColor(currentColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentColor, darkTheme]);

  return (
    <button
      title={disabled ? "This button is disabled" : tooltip}
      className={`${conditionalMode} ${styles.form_btn}`}
      style={{
        color: fontColor,
        background: background,
        border: `1px solid ${currentColor}`,
        fill: fontColor,
      }}
      type={type}
      onClick={onClick}
      onMouseEnter={() => hoverStyle(bgColor, currentColor)}
      onMouseOut={() => hoverStyle(currentColor, bgColor)}
      disabled={disabled}
    >
      {leftIcon && children}
      {name} {!leftIcon && children}
    </button>
  );
};

export default SimpleFormButton;
