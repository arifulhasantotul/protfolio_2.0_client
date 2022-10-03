import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/PageHeader.module.css";

const PageHeader = ({ title }) => {
  const { darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.header_div}`}>
      <h2>{title}</h2>
    </div>
  );
};

export default PageHeader;
