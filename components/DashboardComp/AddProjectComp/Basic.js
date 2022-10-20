import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { saveToLocalStorage } from "@/services/utils/temporarySave";
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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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

  const addToArray = (setArrayFunc, value) => {
    const data = value;
    setArrayFunc((prev) => [...prev, data]);
  };

  const removeFromArray = (setArrayFunc, value) => {
    const data = value;
    setArrayFunc((prev) => prev.filter((item) => item !== data));
  };

  console.log(selectedCategories);
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

    if (name === "categoriesId") {
      addToArray(setSelectedCategories, value);
      setBasicData((prevState) => ({
        ...prevState,
        [name]: selectedCategories,
      }));
    } else if (name === "tagsId") {
      addToArray(setSelectedTags, value);
      setBasicData((prevState) => ({
        ...prevState,
        [name]: selectedTags,
      }));
    } else {
      setBasicData((prevState) => ({ ...prevState, [name]: value }));
    }

    saveToLocalStorage("portfolioAddProjectBasic", basicData);
  };

  console.log(basicData);

  const createSlug = () => {
    if (basicData.name) {
      const slug = basicData?.name.toLowerCase().replace(/ /g, "-");
      setBasicData((prevState) => ({ ...prevState, slug }));
      saveToLocalStorage("portfolioAddProjectBasic", basicData);
    } else {
      setBasicData((prevState) => ({ ...prevState, slug: "" }));
      saveToLocalStorage("portfolioAddProjectBasic", basicData);
    }
  };

  const handleRichText = (value) => {
    if (value) {
      setBasicData((prevState) => ({ ...prevState, des: value }));
      saveToLocalStorage("portfolioAddProjectBasic", basicData);
    } else {
      setBasicData((prevState) => ({ ...prevState, des: "" }));
      saveToLocalStorage("portfolioAddProjectBasic", basicData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataObj = {
        ...basicData,
        des: richTextValue || "",
      };
      saveToLocalStorage("portfolioAddProjectBasic", basicData);

      console.log(dataObj);
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
            {selectedCategories?.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
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
        <div className={styles.submit_btn_wrapper}>
          <SimpleFormButton name="Previous" disabled={true} />
          <SimpleFormButton
            name="Next"
            type="submit"
            onClick={handleSubmit}
            tooltip="Save & Go to next page"
          ></SimpleFormButton>
        </div>
      </form>
    </div>
  );
};

export default Basic;
