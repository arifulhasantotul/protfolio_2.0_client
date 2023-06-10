import DataLoading from "@/components/FetchingResult/DataLoading";
import PageHeader from "@/components/PageHeader/PageHeader";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { ADD_BLOG } from "@/services/graphql/mutation";
import { failedToast, successToast } from "@/services/utils/toasts";
import styles from "@/styles/AddBlog.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const AddBlogComponent = ({ categories, tags }) => {
  const { currentColor, darkTheme } = useStateContext();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsId, setSelectedTagsId] = useState([]);

  const [createBlog, { loading, error }] = useMutation(ADD_BLOG);

  // formData to store changed values
  const [basicData, setBasicData] = useState({
    name: "",
    blog_url: "",
    img: "",
    categoriesId: [],
    tagsId: [],
  });

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
      const changedObj = {
        ...basicData,
        [name]: selectedCategoriesId,
      };
      getMatch(categories, selectedCategoriesId, setSelectedCategories);
    } else if (name === "tagsId") {
      addToArray(selectedCategoriesId, setSelectedTagsId, value);
      setBasicData((prevState) => ({
        ...prevState,
        [name]: selectedTagsId,
      }));
      const changedObj = {
        ...basicData,
        [name]: selectedTagsId,
      };
      getMatch(tags, selectedTagsId, setSelectedTags);
    } else {
      setBasicData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !basicData?.blog_url.startsWith("https://") ||
      !basicData?.img.startsWith("https://")
    ) {
      failedToast(darkTheme, "Please enter valid URL. 😥");
      return;
    }

    try {
      const newData = {
        name: basicData?.name.trim(),
        blog_url: basicData?.blog_url,
        img: basicData?.img,
        categoriesId: selectedCategoriesId,
        tagsId: selectedTagsId,
      };

      const { data } = await createBlog({
        variables: {
          input: newData,
        },
      });

      if (data?.createBlog?.id) {
        successToast(darkTheme, "Blog created successfully. 😊");
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: AddBlogComponent.jsx:135 ~ handleSubmit ~ err:",
        err
      );
      failedToast(darkTheme, err.message);
    }
  };


  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.add_blog_container} ${conditionalMode}`}>
      <Container maxWidth="lg">
        <PageHeader title="Add Blog" />
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          {/* name field */}
          <div className={styles.full_width_inputs}>
            <div className={styles.input_field}>
              <label htmlFor="name">Name</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="name"
                name="name"
                value={basicData?.name}
                onChange={handleInput}
                required
              />
            </div>
            {/* Blog url */}
            <div className={styles.input_field}>
              <label htmlFor="blog_url">Blog URL</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="blog_url"
                name="blog_url"
                value={basicData?.blog_url}
                onChange={handleInput}
                required
              />
            </div>
            {/* IMG */}
            <div className={styles.input_field}>
              <label htmlFor="img">Image URL</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="img"
                name="img"
                value={basicData?.img}
                onChange={handleInput}
                required
              />
            </div>
            {/* Categories field */}
            <div className={styles.input_field}>
              <label htmlFor="categoriesId">Categories</label>
              {/* showing selected categories */}
              {Array.isArray(selectedCategories) && (
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
              {Array.isArray(selectedTags) && (
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

            {/* Submit button */}
            <div className={styles.submit_btn_wrapper}>
              {!loading ? (
                <SimpleFormButton
                  name="Create"
                  type="submit"
                  onClick={handleSubmit}
                  tooltip="Save & Go to next page"
                />
              ) : (
                <DataLoading />
              )}
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddBlogComponent;
