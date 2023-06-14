import DataNotFound from "@/components/FetchingResult/DataNotFound";
import ProjectCard from "@/components/ProjectComp/ProjectCard";
import ProjectSlider from "@/components/Slider/ProjectSlider";
import { useStateContext } from "@/context/ContextProvider";
import { validArray } from "@/services/utils/common";
import styles from "@/styles/HomeProjects.module.css";

const HomeProjects = ({ projects }) => {
  const { currentColor, darkTheme, screenSize } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.project_card}`}>
      {screenSize > 900 ? (
        <div className={styles.card_wrapper}>
          {validArray(projects) ? (
            projects.map((item, idx) => (
              <ProjectCard key={idx} details={item} />
            ))
          ) : (
            <DataNotFound title="Projects not found" />
          )}
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
