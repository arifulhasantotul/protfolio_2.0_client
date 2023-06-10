import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/ProjectsComponent.module.css";
import { Container } from "@mui/material";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const ProjectsComponent = ({ projects }) => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.projects_table_wrapper}`}>
      <Container maxWidth="lg">
        <PageHeader title="Projects" />

        <div
          className={styles.table_container}
          style={{
            color: currentColor,
          }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th className={styles.t_data_center}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(projects)
                ? projects.map((project, idx) => (
                    <tr key={idx}>
                      <td>{project.name}</td>
                      <td className={styles.t_data_center}>
                        <MdEdit className={styles.icon} title="Edit project" />
                        <MdDeleteOutline
                          className={styles.icon}
                          title="Delete project"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!Array.isArray(projects) && (
            <DataNotFound title="Projects not found" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProjectsComponent;
