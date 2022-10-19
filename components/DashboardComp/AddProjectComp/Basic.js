import { useStateContext } from "@/context/ContextProvider";
// import { ALL_TAGS_NAME } from "@/services/graphql/queries";
import styles from "@/styles/ProjectForm.module.css";
// import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useState } from "react";

const QuillEditor = dynamic(() => import("@/components/Editor/QuillEditor"), {
  ssr: false,
});

const Basic = ({ categories, tags, clients, sendData }) => {
  const { currentColor, darkTheme } = useStateContext();

  const [richTextValue, setRichTextValue] = useState("");

  const statusOptions = [
    {
      value: "Not_Started",
      label: "Not Started",
    },
    {
      value: "In_Progress",
      label: "In Progress",
    },
    {
      value: "Completed",
      label: "Completed",
    },
  ];

  const [basicData, setBasicData] = useState({
    name: "",
    slug: "",
    des: "",
    rank: 0,
    categoriesId: [],
    tagsId: [],
    ratings: 0,
    status: "Not_Started",
    clientId: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBasicData((prevState) => ({ ...prevState, [name]: value }));
  };

  const createSlug = () => {
    if (basicData.name) {
      const slug = basicData?.name.toLowerCase().replace(/ /g, "-");
      setBasicData((prevState) => ({ ...prevState, slug }));
    } else {
      setBasicData((prevState) => ({ ...prevState, slug: "" }));
    }
  };

  const handleRichText = (value) => {
    if (value) {
      setBasicData((prevState) => ({ ...prevState, des: value }));
    } else {
      setBasicData((prevState) => ({ ...prevState, des: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(basicData);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(basicData);

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={conditionalMode}>
      <form className={styles.form_wrapper} onSubmit={handleSubmit}>
        {/* name field */}
        <div className={styles.form}>
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
              value={basicData.name}
              onChange={handleInput}
              onBlur={createSlug}
            />
          </div>
          {/* slug field */}
          <div className={styles.input_field}>
            <label htmlFor="slug">Slug Id</label>
            <input
              style={{
                color: currentColor,
              }}
              type="text"
              id="slug"
              name="slug"
              value={basicData.slug}
              onChange={handleInput}
              disabled
            />
          </div>
          {/* rank field */}
          <div className={styles.input_field}>
            <label htmlFor="rank">Rank</label>
            <input
              style={{
                color: currentColor,
              }}
              type="number"
              className="hide_numbers_arrow"
              id="rank"
              name="rank"
              value={basicData.rank}
              onChange={handleInput}
            />
          </div>
          {/* ratings field */}
          <div className={styles.input_field}>
            <label htmlFor="ratings">Ratings</label>
            <input
              style={{
                color: currentColor,
              }}
              type="number"
              className="hide_numbers_arrow"
              id="ratings"
              name="ratings"
              value={basicData.ratings}
              onChange={handleInput}
            />
          </div>
          {/* Categories field */}
          <div className={styles.input_field}>
            <label htmlFor="categoriesId">Categories</label>
            <select
              style={{
                color: currentColor,
              }}
              id="categoriesId"
              name="categoriesId"
              onChange={handleInput}
            >
              <option value="">--Select Categories--</option>
              {categories?.map((opt, idx) => (
                <option key={idx} value={opt?.id}>
                  {opt?.name}
                </option>
              ))}
            </select>
          </div>
          {/* Tags field */}
          <div className={styles.input_field}>
            <label htmlFor="tagsId">Tags</label>
            <select
              style={{
                color: currentColor,
              }}
              id="tagsId"
              name="tagsId"
              onChange={handleInput}
            >
              <option value="">--Select Tags--</option>
              {tags?.map((opt, idx) => (
                <option key={idx} value={opt?.id}>
                  {opt?.name}
                </option>
              ))}
            </select>
          </div>
          {/* Status */}
          <div className={styles.input_field}>
            <label htmlFor="status">Status</label>
            <select
              style={{
                color: currentColor,
              }}
              id="status"
              name="status"
              onChange={handleInput}
            >
              {statusOptions.map((opt, idx) => (
                <option
                  key={idx}
                  value={opt.value}
                  defaultValue={opt.value === "Not_Started" ? true : false}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {/* Client */}
          <div className={styles.input_field}>
            <label htmlFor="clientId">Client</label>
            <select
              style={{
                color: currentColor,
              }}
              id="clientId"
              name="clientId"
              onChange={handleInput}
            >
              <option value="">--Select A Client--</option>
              {clients?.map((opt, idx) => (
                <option key={idx} value={opt?.id}>
                  {opt?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Rich text editor */}
        <div className={styles.input_field}>
          <label htmlFor="des">Description</label>
          <QuillEditor
            id="des"
            name="des"
            className={styles.input}
            value={richTextValue}
            setValue={setRichTextValue}
            onBlur={() => handleRichText(richTextValue)}
          />
        </div>
        {/* Submit button */}
        <input type="submit" value="Next" />
      </form>
    </div>
  );
};

export default Basic;
