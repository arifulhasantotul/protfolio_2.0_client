import React from "react";
import { useStateContext } from "../../../context/ContextProvider";
import { skillData } from "../../SkillPaper/skillData";
import SkillPaper from "../../SkillPaper/SkillPaper";
import styles from "./HomeSkills.module.css";

const HomeSkills = () => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={conditionalMode}>
      <p className={styles.skill_head}>SOME SKILLS</p>
      {skillData.map((item, idx) => (
        <SkillPaper key={idx} tooltip={item?.name}>
          {item?.icon}
        </SkillPaper>
      ))}
    </div>
  );
};

export default HomeSkills;
