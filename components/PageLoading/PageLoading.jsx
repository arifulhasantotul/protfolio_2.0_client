import { useStateContext } from "@/context/ContextProvider";
import styles from "./PageLoading.module.css";
const PageLoading = () => {
  const { darkTheme, currentColor } = useStateContext();
  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${styles.container} ${conditionalMode}`}>
      <div className={styles.ring_wrapper}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <span className={styles.loading}>Please wait...</span>
      </div>
    </div>
  );
};

export default PageLoading;
