import CustomModal from "@/components/CustomModal/CustomModal";
import DataLoading from "@/components/FetchingResult/DataLoading";
import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { DELETE_CATEGORY, UPDATE_CATEGORY } from "@/services/graphql/mutation";
import { ALL_CATEGORIES } from "@/services/graphql/queries";
import {
  confirmModal,
  failedToast,
  successToast,
} from "@/services/utils/toasts";
import styles from "@/styles/CategoriesComponent.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { swrFetcher } from "apolloClient";
import { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import useSWR from "swr";

const CategoriesComponent = ({ initCategories, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [updateVal, setUpdateVal] = useState({
    id: "",
    name: "",
  });

  const handleDelete = async (id) => {
    const confirm = await confirmModal(
      darkTheme,
      "Are you sure to delete this category?"
    );
    if (!confirm) return;
    try {
      const { data } = await deleteCategory({
        variables: {
          id,
        },
      });

      if (data?.deleteCategory?.id) {
        successToast(darkTheme, "Tag deleted successfully. 😊");
        mutate();
      }
    } catch (err) {
      console.log("🚀 ~ file: TagsComponent.jsx:56 ~ handleUpdate ~ err:", err);
      failedToast(darkTheme, err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateCategory({
        variables: {
          id: updateVal?.id,
          input: {
            name: updateVal?.name.trim(),
          },
        },
      });

      if (data?.updateCategory?.id) {
        successToast(darkTheme, "Tag updated successfully. 😊");
        mutate();
        handleCloseModal();
        setUpdateVal({
          id: "",
          name: "",
        });
      }
    } catch (err) {
      console.log("🚀 ~ file: TagsComponent.jsx:56 ~ handleUpdate ~ err:", err);
      failedToast(darkTheme, err.message);
    }
  };

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
                        <MdEdit
                          onClick={() => {
                            handleOpenModal();
                            setUpdateVal({
                              id: category?.id,
                              name: category?.name,
                            });
                          }}
                          className={styles.icon}
                          title="Edit category"
                        />
                        <MdDeleteOutline
                          onClick={() => handleDelete(category?.id)}
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

      <CustomModal open={openModal} handleClose={handleCloseModal}>
        <form className={conditionalMode} onSubmit={handleUpdate}>
          <div className={styles.full_width_inputs}>
            <div className={styles.input_field}>
              <label htmlFor="name">Category Name</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="name"
                name="name"
                value={updateVal?.name}
                onChange={(e) =>
                  setUpdateVal({ ...updateVal, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.submit_btn_wrapper}>
            {!loading ? (
              <SimpleFormButton
                name="Update"
                type="submit"
                onClick={handleUpdate}
                tooltip="Create new tag"
              />
            ) : (
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <DataLoading />
              </div>
            )}
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CategoriesComponent;
