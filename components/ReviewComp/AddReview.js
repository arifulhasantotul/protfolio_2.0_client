import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/AddReview.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const QuillEditor = dynamic(() => import("@/components/Editor/QuillEditor"), {
  ssr: false,
});

const AddReview = () => {
  const { darkTheme, currentColor, screenSize } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    designation: "",
    project: "",
    start_date: "",
    end_date: "",
    rating: "",
    comment: "",
  });

  const [richTextValue, setRichTextValue] = useState("");

  const handleRichText = (value) => {
    if (value) {
      setReviewData((prevState) => ({ ...prevState, comment: value }));
      saveToLocalStorage("portfolioAddReviewData", reviewData);
    } else {
      setReviewData((prevState) => ({ ...prevState, comment: "" }));
      saveToLocalStorage("portfolioAddReviewData", reviewData);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={`${conditionalMode}`}>
      <div className={styles.form_wrapper}>
        <div className={styles.half_width_inputs}>
          {/* name field */}
          <div className={styles.input_field}>
            <label htmlFor="name">
              Name{" "}
              <span
                className={styles.red_color}
              >{`(Unique name required!)`}</span>
            </label>
            <input
              style={{
                color: currentColor,
              }}
              type="text"
              id="name"
              name="name"
              value={reviewData.name}
              onChange={handleInput}
            />
          </div>
          {/* email field */}
          <div className={styles.input_field}>
            <label htmlFor="email">Email</label>
            <input
              style={{
                color: currentColor,
              }}
              type="email"
              id="email"
              name="email"
              value={reviewData.email}
              onChange={handleInput}
              required
            />
          </div>
          {/* designation field */}
          <div className={styles.input_field}>
            <label htmlFor="designation">Designation</label>
            <input
              style={{
                color: currentColor,
              }}
              type="text"
              id="designation"
              name="designation"
              value={reviewData.designation}
              onChange={handleInput}
            />
          </div>
          {/* project name field */}
          <div className={styles.input_field}>
            <label htmlFor="project">Project Name</label>
            <input
              style={{
                color: currentColor,
              }}
              type="text"
              id="project"
              name="project"
              value={reviewData.project}
              onChange={handleInput}
            />
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
                value={reviewData.start_date}
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
                value={reviewData.date_range}
                onChange={handleInput}
              />
            </div>
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
                value={reviewData.rating}
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
            onBlur={() => handleRichText(richTextValue)}
          />
        </div>

        <div className={styles.input_field}></div>
      </div>
    </div>
  );
};

export default AddReview;
