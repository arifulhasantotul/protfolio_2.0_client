import CustomModal from "@/components/CustomModal/CustomModal";
import DataLoading from "@/components/FetchingResult/DataLoading";
import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { DELETE_TAG, UPDATE_TAG } from "@/services/graphql/mutation";
import { ALL_TAGS } from "@/services/graphql/queries";
import { failedToast, successToast } from "@/services/utils/toasts";
import styles from "@/styles/TagsComponent.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { swrFetcher } from "apolloClient";
import { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import useSWR from "swr";

const TagsComponent = ({ initTags, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();

  const [openModal, setOpenModal] = useState(false);
  const [updateTag, { loading }] = useMutation(UPDATE_TAG);
  const [deleteTag, { loading: deleteLoading }] = useMutation(DELETE_TAG);

  const fetcher = async () => {
    const { listTag } = await swrFetcher(accessToken, ALL_TAGS, {});
    return listTag;
  };

  const { data, mutate, error } = useSWR([ALL_TAGS, {}], fetcher, {
    initialData: initTags,
    revalidateOnFocus: false,
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [updateVal, setUpdateVal] = useState({
    id: "",
    name: "",
  });

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteTag({
        variables: {
          id,
        },
      });

      if (data?.deleteTag?.id) {
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
      const { data } = await updateTag({
        variables: {
          id: updateVal?.id,
          input: {
            name: updateVal?.name.trim(),
          },
        },
      });

      if (data?.updateTag?.id) {
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
              {Array.isArray(data)
                ? data.map((tag, idx) => (
                    <tr key={idx}>
                      <td>{tag?.name}</td>
                      <td className={styles.t_data_center}>
                        <MdEdit
                          onClick={() => {
                            handleOpenModal();
                            setUpdateVal({
                              id: tag?.id,
                              name: tag?.name,
                            });
                          }}
                          className={styles.icon}
                          title="Edit tag"
                        />
                        <MdDeleteOutline
                          onClick={() => handleDelete(tag?.id)}
                          className={styles.icon}
                          title="Delete tag"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!Array.isArray(data) && <DataNotFound title="Tags not found" />}
        </div>
      </Container>

      <CustomModal open={openModal} handleClose={handleCloseModal}>
        <form className={conditionalMode} onSubmit={handleUpdate}>
          <div className={styles.full_width_inputs}>
            <div className={styles.input_field}>
              <label htmlFor="name">Tag Name</label>
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

export default TagsComponent;
