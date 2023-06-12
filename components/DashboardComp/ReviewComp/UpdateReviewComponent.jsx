import DataLoading from "@/components/FetchingResult/DataLoading";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import {
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/services/utils/temporarySave";
import styles from "@/styles/UpdateReviewComponent.module.css";
import { Rating, styled } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaHeartbeat, FaRegHeart } from "react-icons/fa";

const QuillEditor = dynamic(() => import("@/components/Editor/QuillEditor"), {
  ssr: false,
});

const UpdateReview = ({
  reviewData,
  setReviewData,
  handleSubmit,
  closeModal,
}) => {
  const { darkTheme, currentColor, screenSize } = useStateContext();

  const [ratingVal, setRatingVal] = useState(reviewData?.rating || 0);
  const [sendingComment, setSendingComment] = useState(false);
  const [richTextValue, setRichTextValue] = useState(reviewData?.comment || "");

  const handleRichText = (value) => {
    const newObj = {
      ...reviewData,
      comment: value || "",
    };

    setReviewData(newObj);
    saveToLocalStorage("portfolioUpdateReviewData", newObj);
  };

  const handleRating = (e, value) => {
    setRatingVal(value);
    const newObj = {
      ...reviewData,
      rating: value,
    };
    setReviewData(newObj);
    saveToLocalStorage("portfolioUpdateReviewData", newObj);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newObj = { ...reviewData, [name]: value };
    setReviewData(newObj);
    saveToLocalStorage("portfolioUpdateReviewData", newObj);
  };

  const handleReset = () => {
    document.getElementById("title").value = "";
    document.getElementById("rating").value = 0;
    document.getElementById("start_date").value = "";
    document.getElementById("end_date").value = "";
    setRatingVal(0);
    setRichTextValue("");
    setReviewData({
      id: "",
      title: "",
      rating: "",
      start_date: "",
      end_date: "",
      comment: "",
      reviewerId: "",
    });
    removeFromLocalStorage("portfolioUpdateReviewData");
    closeModal();
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: currentColor,
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <div className={`${conditionalMode}`}>
      <>
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          <div className={styles.half_width_inputs}>
            {/* title field */}
            <div className={styles.input_field}>
              <label htmlFor="title">Title</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="title"
                name="title"
                value={reviewData?.title}
                onChange={handleInput}
              />
            </div>

            {/* Rating field */}
            <div className={styles.date_range}>
              <div className={styles.input_field}>
                <label htmlFor="start_date">Rating</label>
                <input
                  style={{
                    color: currentColor,
                    width: "calc(100% - 10px)",
                  }}
                  type="text"
                  id="rating"
                  name="rating"
                  value={reviewData?.rating || 0}
                  onChange={handleInput}
                  disabled
                />
              </div>
              <div className={styles.rating_div}>
                <StyledRating
                  className={styles.rating}
                  name="customized-color"
                  value={ratingVal || 0}
                  precision={0.1}
                  onChange={handleRating}
                  icon={<FaHeartbeat fontSize="inherit" />}
                  emptyIcon={<FaRegHeart fontSize="inherit" />}
                />
              </div>
            </div>

            {/* date range field */}
            <div className={styles.date_range}>
              <div className={styles.input_field}>
                <label htmlFor="start_date">From</label>
                <input
                  style={{
                    color: currentColor,
                    width: "calc(100% - 10px)",
                    cursor: "pointer",
                  }}
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={reviewData?.start_date}
                  onChange={handleInput}
                />
              </div>

              <div className={styles.input_field}>
                <label
                  style={{
                    marginTop: `${screenSize < 450 ? "20px" : "0px"}`,
                  }}
                  htmlFor="end_date"
                >
                  To
                </label>
                <input
                  style={{
                    color: currentColor,
                    width: "calc(100% - 10px)",
                    marginLeft: `${screenSize < 450 ? "0px" : "10px"}`,
                    cursor: "pointer",
                  }}
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={reviewData?.end_date}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
          {/* Rich text editor */}
          <div className={styles.input_field}>
            <label
              style={{
                marginBottom: "10px",
              }}
              htmlFor="comment"
            >
              Comment
            </label>
            <QuillEditor
              id="comment"
              name="comment"
              className={styles.input}
              value={richTextValue}
              setValue={setRichTextValue}
              onChange={(e) => setRichTextValue(e.target.value)}
              onBlur={() => handleRichText(richTextValue)}
            />
          </div>

          {!sendingComment ? (
            <div className={styles.btn_div}>
              <SimpleFormButton
                name="❌ Reset"
                type="button"
                onClick={handleReset}
                tooltip="Reset form data"
              />
              {screenSize > 450 && <div></div>}
              <SimpleFormButton
                name="Done 👍"
                type="submit"
                tooltip="Double click to submit"
                // disabled={isDisabled}
              />
            </div>
          ) : (
            <DataLoading />
          )}
        </form>
      </>
    </div>
  );
};

export default UpdateReview;
