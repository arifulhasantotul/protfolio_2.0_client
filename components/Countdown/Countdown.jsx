import { useEffect, useState } from "react";

import { useStateContext } from "@/context/ContextProvider";
import styles from "./Countdown.module.css";

const Countdown = ({ msg = "Expire within", endTime }) => {
  console.log("🚀 ~ file: Countdown.jsx:2 ~ Countdown ~ endTime:", endTime);
  const { currentColor, darkTheme } = useStateContext();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const conditionalMode = darkTheme ? styles.dark : styles.light;

  useEffect(() => {
    const target = new Date(endTime);
    if (new Date().getTime() < target.getTime()) {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        setDays(d);

        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        setHours(h);

        const m = Math.floor((difference / (1000 * 60)) % 60);
        setMinutes(m);

        const s = Math.floor(difference / 1000) % 60;
        setSeconds(s);

        if (difference <= 2) {
          clearInterval(interval);
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
        }
      }, [1000]);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`${conditionalMode} ${styles.countdown_comp}`}>
      <h2 className={styles.msg}>{msg}</h2>

      <div className={styles.timer_wrapper}>
        <div className={styles.timer_segment}>
          <div
            style={{
              color: currentColor,
            }}
            className={styles.time}
          >
            {days}
          </div>
          <div className={styles.label}>Days</div>
        </div>
        <div className={styles.timer_segment}>
          <div
            style={{
              color: currentColor,
            }}
            className={styles.time}
          >
            {hours}
          </div>
          <div className={styles.label}>Hours</div>
        </div>
        <div className={styles.timer_segment}>
          <div
            style={{
              color: currentColor,
            }}
            className={styles.time}
          >
            {minutes}
          </div>
          <div className={styles.label}>Minutes</div>
        </div>
        <div className={styles.timer_segment}>
          <div
            style={{
              color: currentColor,
            }}
            className={styles.time}
          >
            {seconds}
          </div>
          <div className={styles.label}>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
