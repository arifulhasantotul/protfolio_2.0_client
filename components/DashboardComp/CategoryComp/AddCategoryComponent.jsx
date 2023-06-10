import DataLoading from "@/components/FetchingResult/DataLoading";
import PageHeader from "@/components/PageHeader/PageHeader";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { ADD_CATEGORY } from "@/services/graphql/mutation";
import { failedToast, successToast } from "@/services/utils/toasts";
import styles from "@/styles/AddCategory.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { useState } from "react";

const AddCategoryComponent = () => {
  const { currentColor, darkTheme } = useStateContext();

  const [inputData, setInputData] = useState({
    name: "",
  });
  const [createCategory, { data, loading, error }] = useMutation(ADD_CATEGORY);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createCategory({
        variables: {
          input: {
            name: inputData?.name.trim(),
          },
        },
      });
      console.log(data);

      if (data?.createCategory?.id) {
        successToast(darkTheme, "Category created successfully. 😊");
        setInputData({
          name: "",
        });
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: AddCategoryComponent.jsx:44 ~ handleSubmit ~ err:",
        err
      );
      failedToast(darkTheme, err.message);
    }
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.category_form}`}>
      <Container maxWidth="lg">
        <PageHeader title="Add Category" />

        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          <div className={styles.full_width_inputs}>
            <div className={styles.input_field}>
              <label htmlFor="name">Category Name</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="name"
                name="name"
                value={inputData?.name}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <div className={styles.submit_btn_wrapper}>
            {!loading ? (
              <SimpleFormButton
                name="Create"
                type="submit"
                onClick={handleSubmit}
                tooltip="Create new category"
              />
            ) : (
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <DataLoading />
              </div>
            )}
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddCategoryComponent;
