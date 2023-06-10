import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/Project.module.css";
import { Container } from "@mui/material";
import DataNotFound from "../FetchingResult/DataNotFound";
import ProjectCard from "./ProjectCard";

const Project = ({ projects, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.project_page} ${conditionalMode}`}>
      <>
        <Container maxWidth="xl">
          <div className={styles.card_wrapper}>
            {Array.isArray(projects) ? (
              projects.map((item, idx) => (
                <ProjectCard key={idx} details={item} />
              ))
            ) : (
              <DataNotFound />
            )}
          </div>
        </Container>
      </>
    </div>
  );
};

export default Project;
