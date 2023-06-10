import ProjectCard from "@/components/ProjectComp/ProjectCard";
import ProjectSlider from "@/components/Slider/ProjectSlider";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/HomeProjects.module.css";

const HomeProjects = ({ projects }) => {
  const { currentColor, darkTheme, screenSize } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.project_card}`}>
      {screenSize > 900 ? (
        <div className={styles.card_wrapper}>
          {Array.isArray(projects) &&
            projects.map((item, idx) => (
              <ProjectCard key={idx} details={item} />
            ))}
        </div>
      ) : (
        <div className={styles.card_wrapper}>
          <ProjectSlider allProject={projects} />
        </div>
      )}
    </div>
  );
};

export default HomeProjects;
