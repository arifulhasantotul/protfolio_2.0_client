import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/SkillPaper.module.css";

const SkillPaper = ({ tooltip, children, mr, mt }) => {
  const { darkTheme } = useStateContext();

  // HACK: css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div
      title={tooltip}
      className={`${conditionalMode} ${styles.skill}`}
      style={{
        marginRight: `${mr}`,
        marginTop: `${mt}`,
      }}
    >
      {children}
    </div>
  );
};

export default SkillPaper;
