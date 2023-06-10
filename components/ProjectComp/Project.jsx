import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProjectCard from "@/components/ProjectComp/ProjectCard";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/Project.module.css";
import { Container } from "@mui/material";

const Project = ({ projects, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.project_page} ${conditionalMode}`}>
      <>
        <Container maxWidth="xl">
          <PageHeader title="All Project" />
          <div className={styles.card_wrapper}>
            {Array.isArray(projects) ? (
              projects.map((item, idx) => (
                <ProjectCard key={idx} details={item} />
              ))
            ) : (
              <DataNotFound title="Projects not found" />
            )}
          </div>
        </Container>
      </>
    </div>
  );
};

export default Project;
