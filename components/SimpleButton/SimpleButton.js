import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/SimpleButton.module.css";
import { useEffect, useState } from "react";

const SimpleButton = ({ name, type, onClick, children, tooltip }) => {
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
      title={tooltip}
      className={`${conditionalMode} ${styles.btn}`}
      style={{
        color: fontColor,
        background: background,
      }}
      type={type}
      onClick={onClick}
      onMouseEnter={() => hoverStyle(bgColor, currentColor)}
      onMouseOut={() => hoverStyle(currentColor, bgColor)}
    >
      {children}
      {name}
    </button>
  );
};

export default SimpleButton;
