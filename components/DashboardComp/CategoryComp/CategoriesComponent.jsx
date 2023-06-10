import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/CategoriesComponent.module.css";
import { Container } from "@mui/material";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const CategoriesComponent = ({ categories }) => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.categories_table_wrapper}`}>
      <Container maxWidth="lg">
        <PageHeader title="Categories" />

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
              {Array.isArray(categories)
                ? categories.map((category, idx) => (
                    <tr key={idx}>
                      <td>{category.name}</td>
                      <td className={styles.t_data_center}>
                        <MdEdit className={styles.icon} title="Edit category" />
                        <MdDeleteOutline
                          className={styles.icon}
                          title="Delete category"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!Array.isArray(categories) && (
            <DataNotFound title="Categories not found" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesComponent;
