import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { saveToLocalStorage } from "@/services/utils/temporarySave";
import styles from "@/styles/ProjectForm.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const QuillEditor = dynamic(() => import("@/components/Editor/QuillEditor"), {
  ssr: false,
});

const Basic = ({ categories, tags, clients, sendData }) => {
  const { currentColor, darkTheme } = useStateContext();

  const [richTextValue, setRichTextValue] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsId, setSelectedTagsId] = useState([]);

  // formData to store changed values
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

  // project status options
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

  // handling new items to array
  const addToArray = (arrayOfId, setArrayFunc, value) => {
    const data = value;
    if (!arrayOfId.includes(data)) {
      setArrayFunc((prev) => [...prev, data]);
    }
  };

  // handling remove items by id from array
  const removeFromArray = (
    showingArray,
    showingArrayId,
    setShowingArray,
    setShowingArrayId,
    id
  ) => {
    const copyArray = [...showingArray];
    const copyIdArray = [...showingArrayId];
    const foundIdIdx = copyIdArray.findIndex((item) => item === id);
    const foundArrayIdx = copyArray.findIndex((item) => item.id === id);
    copyIdArray.splice(foundIdIdx, 1);
    copyArray.splice(foundArrayIdx, 1);
    setShowingArray(copyArray);
    setShowingArrayId(copyIdArray);
  };

  // matching two arrays for showing selected items
  const getMatch = (arrayOfObj, arrayOfId, setArrayFunc) => {
    const matchedArr = [];
    for (let i = 0; i < arrayOfObj.length; i++) {
      for (let j = 0; j < arrayOfId.length; j++) {
        if (arrayOfObj[i].id === arrayOfId[j]) {
          matchedArr.push(arrayOfObj[i]);
        }
      }
    }
    setArrayFunc(matchedArr);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "categoriesId") {
      addToArray(selectedCategoriesId, setSelectedCategoriesId, value);
      setBasicData((prevState) => ({
        ...prevState,
        [name]: selectedCategoriesId,
      }));
      getMatch(categories, selectedCategoriesId, setSelectedCategories);
    } else if (name === "tagsId") {
      addToArray(selectedCategoriesId, setSelectedTagsId, value);
      setBasicData((prevState) => ({
        ...prevState,
        [name]: selectedTagsId,
      }));
      getMatch(tags, selectedTagsId, setSelectedTags);
    } else {
      setBasicData((prevState) => ({ ...prevState, [name]: value }));
    }

    saveToLocalStorage("portfolioAddProjectBasic", basicData);
  };

  // console.log(basicData);

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
        <div className={styles.half_width_inputs}>
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
        {/* Categories field */}
        <div className={styles.full_width_inputs}>
          <div className={styles.input_field}>
            <label htmlFor="categoriesId">Categories</label>
            {/* showing selected categories */}
            {selectedCategories.length > 0 && (
              <div className={styles.selected_array}>
                {selectedCategories?.map((item, idx) => (
                  <span
                    style={{
                      background: currentColor,
                    }}
                    className={styles.selected_item}
                    key={idx}
                  >
                    {item.name}{" "}
                    <IoMdCloseCircle
                      title="Remove category"
                      style={{
                        color: currentColor,
                      }}
                      className={styles.delete}
                      onClick={() =>
                        removeFromArray(
                          selectedCategories,
                          selectedCategoriesId,
                          setSelectedCategories,
                          setSelectedCategoriesId,
                          item.id
                        )
                      }
                    />
                  </span>
                ))}
              </div>
            )}
            <select
              style={{
                color: currentColor,
              }}
              id="categoriesId"
              name="categoriesId"
              onChange={handleInput}
              onBlur={() =>
                getMatch(
                  categories,
                  selectedCategoriesId,
                  setSelectedCategories
                )
              }
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
            {/* showing selected categories */}
            {selectedTags.length > 0 && (
              <div className={styles.selected_array}>
                {selectedTags?.map((item, idx) => (
                  <span
                    style={{
                      background: currentColor,
                    }}
                    className={styles.selected_item}
                    key={idx}
                  >
                    {item.name}
                    <IoMdCloseCircle
                      title="Remove category"
                      style={{
                        color: currentColor,
                      }}
                      className={styles.delete}
                      onClick={() =>
                        removeFromArray(
                          selectedTags,
                          selectedTagsId,
                          setSelectedTags,
                          setSelectedTagsId,
                          item.id
                        )
                      }
                    />
                  </span>
                ))}
              </div>
            )}
            <select
              style={{
                color: currentColor,
              }}
              id="tagsId"
              name="tagsId"
              onChange={handleInput}
              onBlur={() => getMatch(tags, selectedTagsId, setSelectedTags)}
            >
              <option value="">--Select Tags--</option>
              {tags?.map((opt, idx) => (
                <option key={idx} value={opt?.id}>
                  {opt?.name}
                </option>
              ))}
            </select>
          </div>
          {/* Rich text editor */}
          <div className={styles.input_field}>
            <label
              style={{
                marginBottom: "10px",
              }}
              htmlFor="des"
            >
              Description
            </label>
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
        </div>
      </form>
    </div>
  );
};

export default Basic;
