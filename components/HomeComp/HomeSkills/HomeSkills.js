import SkillPaper from "@/components/SkillPaper/SkillPaper";
import SkillSlider from "@/components/Slider/SkillSlider";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/HomeSkills.module.css";
import { skillData } from "../../SkillPaper/skillData";

const HomeSkills = () => {
  const { darkTheme, screenSize } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={conditionalMode}>
      <p className={styles.skill_head}>SOME SKILLS</p>
      {screenSize > 1520 ? (
        skillData.map((item, idx) => (
          <SkillPaper key={idx} tooltip={item?.name}>
            {item?.icon}
          </SkillPaper>
        ))
      ) : (
        <SkillSlider data={skillData} />
      )}
    </div>
  );
};

export default HomeSkills;
