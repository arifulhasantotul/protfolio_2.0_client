import CustomModal from "@/components/CustomModal/CustomModal";
import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import { DELETE_REVIEW, UPDATE_REVIEW } from "@/services/graphql/mutation";
import { ALL_REVIEWS } from "@/services/graphql/queries";
import {
  confirmModal,
  failedToast,
  successToast,
} from "@/services/utils/toasts";
import styles from "@/styles/TagsComponent.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { swrFetcher } from "apolloClient";
import { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import useSWR from "swr";
import UpdateReview from "./UpdateReviewComponent";

const ReviewsComponent = ({ initReviews, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();

  const [openModal, setOpenModal] = useState(false);
  const [updateReview, { loading }] = useMutation(UPDATE_REVIEW);
  const [deleteReview, { loading: deleteLoading }] = useMutation(DELETE_REVIEW);

  const fetcher = async () => {
    const { listReview } = await swrFetcher(accessToken, ALL_REVIEWS, {});
    return listReview;
  };

  const { data, mutate, error } = useSWR([ALL_REVIEWS, {}], fetcher, {
    initialData: initReviews,
    revalidateOnFocus: false,
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [updateVal, setUpdateVal] = useState({
    id: "",
    title: "",
    rating: "",
    start_date: "",
    end_date: "",
    comment: "",
    reviewerId: "",
  });

  const getDefVal = (item = null) => {
    if (item) {
      setUpdateVal((prv) => ({
        ...prv,
        id: item?.id,
        title: item?.title,
        rating: item?.rating,
        start_date: item?.projectStartDate,
        end_date: item?.projectEndDate,
        comment: item?.comment,
        reviewerId: item?.reviewerId,
      }));
    }
  };

  const handleEdit = (item) => {
    getDefVal(item);
    handleOpenModal();
  };

  const handleDelete = async (id) => {
    const confirm = await confirmModal(
      darkTheme,
      "Are you sure to delete this review?"
    );
    if (!confirm) return;

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
      const { data } = await updateReview({
        variables: {
          id: updateVal?.id,
          input: {
            title: updateVal?.title,
            rating: updateVal?.rating,
            projectStartDate: updateVal?.start_date,
            projectEndDate: updateVal?.end_date,
            comment: updateVal?.comment,
            reviewerId: updateVal?.reviewerId,
          },
        },
      });

      if (data?.updateReview?.id) {
        successToast(darkTheme, "Review updated successfully. 😊");
        mutate();
        handleCloseModal();
        setUpdateVal({
          id: "",
          title: "",
          rating: "",
          start_date: "",
          end_date: "",
          comment: "",
          reviewerId: "",
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
                          onClick={() => handleEdit(review)}
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

      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        width="max-content"
      >
        <UpdateReview
          reviewData={updateVal}
          setReviewData={setUpdateVal}
          handleSubmit={handleUpdate}
          closeModal={handleCloseModal}
        />
      </CustomModal>
    </div>
  );
};

export default ReviewsComponent;
