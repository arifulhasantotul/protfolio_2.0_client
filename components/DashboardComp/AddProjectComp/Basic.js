import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/ProjectForm.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const QuillEditor = dynamic(() => import("@/components/Editor/QuillEditor"), {
  ssr: false,
});

const Basic = (props) => {
  const { currentColor, darkTheme } = useStateContext();

  const [richTextValue, setRichTextValue] = useState("");

  const selectOptions = [
    {
      value: "Web Development",
      label: "Web Development",
    },
    {
      value: "Mobile Development",
      label: "Mobile Development",
    },
    {
      value: "Desktop Development",
      label: "Desktop Development",
    },
    {
      value: "Game Development",
      label: "Game Development",
    },
    {
      value: "Machine Learning",
      label: "Machine Learning",
    },
  ];

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
    status: "",
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
              {selectOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
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
              {selectOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
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
            <label htmlFor="ClientId">Client</label>
            <select
              style={{
                color: currentColor,
              }}
              id="ClientId"
              name="ClientId"
              onChange={handleInput}
            >
              <option value="">--Select A Client--</option>
              {selectOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Rich text editor */}
        <div className={styles.input_field}>
          <label htmlFor="des">Description</label>
          <QuillEditor
            className={styles.input}
            value={richTextValue}
            setValue={setRichTextValue}
          />
        </div>
      </form>
    </div>
  );
};

export default Basic;
