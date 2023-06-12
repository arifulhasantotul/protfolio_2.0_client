import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import { DELETE_CATEGORY, UPDATE_CATEGORY } from "@/services/graphql/mutation";
import { ALL_CATEGORIES } from "@/services/graphql/queries";
import styles from "@/styles/CategoriesComponent.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { swrFetcher } from "apolloClient";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import useSWR from "swr";

const CategoriesComponent = ({ initCategories, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY);
  const [deleteCategory, { loading: deleteLoading }] =
    useMutation(DELETE_CATEGORY);

  const fetcher = async () => {
    const { listCategory } = await swrFetcher(accessToken, ALL_CATEGORIES, {});
    return listCategory;
  };

  const { data, mutate, error } = useSWR([ALL_CATEGORIES, {}], fetcher, {
    initialData: initCategories,
    revalidateOnFocus: false,
  });

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
              {Array.isArray(data)
                ? data.map((category, idx) => (
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
          {!Array.isArray(data) && (
            <DataNotFound title="Categories not found" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesComponent;
