import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import { DELETE_PROJECT } from "@/services/graphql/mutation";
import { ALL_PROJECTS } from "@/services/graphql/queries";
import { validArray } from "@/services/utils/common";
import {
  confirmModal,
  failedToast,
  successToast,
} from "@/services/utils/toasts";
import styles from "@/styles/ProjectsComponent.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { swrFetcher } from "apolloClient";
import { useRouter } from "next/router";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import useSWR from "swr";

const ProjectsComponent = ({ initProjects, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();
  const router = useRouter();

  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT);

  const fetcher = async () => {
    const { listProject } = await swrFetcher(accessToken, ALL_PROJECTS, {});
    return listProject;
  };

  const { data, mutate, error } = useSWR([ALL_PROJECTS, {}], fetcher, {
    initialData: initProjects,
    revalidateOnFocus: false,
  });

  const handleDelete = async (id) => {
    const confirm = await confirmModal(
      darkTheme,
      "Are you sure to delete this project?"
    );
    if (!confirm) return;

    try {
      const { data } = await deleteProject({
        variables: {
          id,
        },
      });

      if (data?.deleteProject?.id) {
        successToast(darkTheme, "Project deleted successfully. 😊");
        mutate();
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: ProjectsComponent.jsx:56 ~ handleUpdate ~ err:",
        err
      );
      failedToast(darkTheme, err.message);
    }
  };

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
              {validArray(data)
                ? data.map((project, idx) => (
                    <tr key={idx}>
                      <td>{project?.name}</td>
                      <td className={styles.t_data_center}>
                        <MdEdit
                          onClick={() =>
                            router.push(
                              `/dashboard/project/edit/${project?.id}`
                            )
                          }
                          className={styles.icon}
                          title="Edit project"
                        />
                        <MdDeleteOutline
                          onClick={() => handleDelete(project?.id)}
                          className={styles.icon}
                          title="Delete project"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!validArray(data) && <DataNotFound title="Projects not found" />}
        </div>
      </Container>
    </div>
  );
};

export default ProjectsComponent;
