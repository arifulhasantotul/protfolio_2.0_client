import DataLoading from "@/components/FetchingResult/DataLoading";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/UpdateBlog.module.css";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const UpdateBlogComponent = ({
  categories,
  tags,
  blogData,
  setBlogData,
  handleUpdate,
  closeModal,
  loading,
}) => {
  const { currentColor, darkTheme } = useStateContext();

  const [selectedCategories, setSelectedCategories] = useState(
    blogData?.categories || []
  );
  const [selectedCategoriesId, setSelectedCategoriesId] = useState(
    blogData?.categoriesId || []
  );

  const [selectedTags, setSelectedTags] = useState(blogData?.tags || []);
  const [selectedTagsId, setSelectedTagsId] = useState(blogData?.tagsId || []);

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
      setBlogData((prevState) => ({
        ...prevState,
        [name]: Array.from(new Set([...selectedCategoriesId, value])),
      }));

      getMatch(categories, selectedCategoriesId, setSelectedCategories);
    } else if (name === "tagsId") {
      addToArray(selectedTagsId, setSelectedTagsId, value);
      setBlogData((prevState) => ({
        ...prevState,
        [name]: Array.from(new Set([...selectedTagsId, value])),
      }));

      getMatch(tags, selectedTagsId, setSelectedTags);
    } else {
      setBlogData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  useEffect(() => {
    blogData.categoriesId = [...selectedCategoriesId];
    blogData.tagsId = [...selectedTagsId];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoriesId, selectedTagsId]);

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.update_blog_container} ${conditionalMode}`}>
      <Container maxWidth="lg">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Update Blog
        </h1>

        <form className={styles.form_wrapper} onSubmit={handleUpdate}>
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
                value={blogData?.name}
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
                value={blogData?.blog_url}
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
                value={blogData?.img}
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
              <SimpleFormButton
                name="❌ Close"
                type="button"
                onClick={closeModal}
                tooltip="Close Modal"
              />
              {!loading ? (
                <SimpleFormButton
                  name="Update 👍"
                  type="submit"
                  onClick={handleUpdate}
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

export default UpdateBlogComponent;
