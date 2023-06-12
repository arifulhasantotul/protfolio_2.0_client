import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import { DELETE_REVIEW } from "@/services/graphql/mutation";
import { ALL_REVIEWS } from "@/services/graphql/queries";
import { failedToast, successToast } from "@/services/utils/toasts";
import styles from "@/styles/TagsComponent.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { swrFetcher } from "apolloClient";
import { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import useSWR from "swr";

const ReviewsComponent = ({ initReviews, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();

  const [deleteReview, { loading: deleteLoading }] = useMutation(DELETE_REVIEW);

  const fetcher = async () => {
    const { listReview } = await swrFetcher(accessToken, ALL_REVIEWS, {});
    return listReview;
  };

  const { data, mutate, error } = useSWR([ALL_REVIEWS, {}], fetcher, {
    initialData: initReviews,
    revalidateOnFocus: false,
  });

  const [updateVal, setUpdateVal] = useState({
    id: "",
    name: "",
  });

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteReview({
        variables: {
          id,
        },
      });

      if (data?.deleteReview?.id) {
        successToast(darkTheme, "Review deleted successfully. 😊");
        mutate();
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: ReviewsComponent.jsx:56 ~ handleUpdate ~ err:",
        err
      );
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
      console.log(
        "🚀 ~ file: ReviewsComponent.jsx:56 ~ handleUpdate ~ err:",
        err
      );
      failedToast(darkTheme, err.message);
    }
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.tags_table_wrapper}`}>
      <Container maxWidth="lg">
        <PageHeader title="Reviews" />

        <div
          className={styles.table_container}
          style={{
            color: currentColor,
          }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Rating</th>
                <th className={styles.t_data_center}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data)
                ? data.map((review, idx) => (
                    <tr key={idx}>
                      <td>{review?.title}</td>
                      <td>{review?.rating}</td>
                      <td className={styles.t_data_center}>
                        <MdEdit
                          onClick={() => console.log("update")}
                          className={styles.icon}
                          title="Edit review"
                        />
                        <MdDeleteOutline
                          onClick={() => handleDelete(review?.id)}
                          className={styles.icon}
                          title="Delete review"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!Array.isArray(data) && <DataNotFound title="Reviews not found" />}
        </div>
      </Container>
    </div>
  );
};

export default ReviewsComponent;
