import { useStateContext } from "@/context/ContextProvider";
import { useEffect, useState } from "react";
import styles from "./CircularProgressBar.module.css";

const CircularProgressBar = ({ percentage = 45 }) => {
  const { currentColor, darkTheme } = useStateContext();
  const [counter, setCounter] = useState(0);

  let num = +percentage;
  let strokeDashoffsetVal = 472 - (472 * num) / 100;

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      if (counter <= num) {
        val++;
        setCounter((prv) => prv + 1);
      }
      if (val >= num) {
        clearInterval(interval);
      }
    }, [35]);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${conditionalMode} ${styles.progress}`}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.number}>{counter}%</div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="160px"
        height="160px"
        className={styles.svg}
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#673ab7" />
          </linearGradient>
        </defs>
        <circle
          className={styles.circle}
          cx="80"
          cy="80"
          r="70"
          strokeLinecap="round"
          style={{
            strokeDashoffset: strokeDashoffsetVal,
          }}
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
