import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/SkillPaper.module.css";

const SkillPaper = ({ tooltip, children }) => {
  const { darkTheme } = useStateContext();

  // HACK: css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div title={tooltip} className={`${conditionalMode} ${styles.skill}`}>
      {children}
    </div>
  );
};

export default SkillPaper;
