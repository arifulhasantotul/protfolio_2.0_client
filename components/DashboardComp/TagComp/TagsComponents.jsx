import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/TagsComponent.module.css";
import { Container } from "@mui/material";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const TagsComponent = ({ tags }) => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.tags_table_wrapper}`}>
      <Container maxWidth="lg">
        <PageHeader title="Tags" />

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
              {Array.isArray(tags)
                ? tags.map((tag, idx) => (
                    <tr key={idx}>
                      <td>{tag.name}</td>
                      <td className={styles.t_data_center}>
                        <MdEdit className={styles.icon} title="Edit tag" />
                        <MdDeleteOutline
                          className={styles.icon}
                          title="Delete tag"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!Array.isArray(tags) && <DataNotFound title="Tags not found" />}
        </div>
      </Container>
    </div>
  );
};

export default TagsComponent;
