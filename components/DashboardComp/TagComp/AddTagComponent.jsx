import DataLoading from "@/components/FetchingResult/DataLoading";
import PageHeader from "@/components/PageHeader/PageHeader";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { ADD_TAG } from "@/services/graphql/mutation";
import { failedToast, successToast } from "@/services/utils/toasts";
import styles from "@/styles/AddTag.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { useState } from "react";

const AddTagComponent = () => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  const [inputData, setInputData] = useState({
    name: "",
  });
  const [createTag, { data, loading, error }] = useMutation(ADD_TAG);

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
      const { data } = await createTag({
        variables: {
          input: {
            name: inputData?.name.trim(),
          },
        },
      });
      console.log(data);

      if (data?.createTag?.id) {
        successToast(darkTheme, "Tag created successfully. 😊");
        setInputData({
          name: "",
        });
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: AddTagComponent.jsx:50 ~ handleSubmit ~ err:",
        err
      );
      failedToast(darkTheme, err.message);
    }
  };

  return (
    <div className={`${conditionalMode} ${styles.tag_form}`}>
      <Container maxWidth="lg">
        <PageHeader title="Add Tag" />

        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          <div className={styles.full_width_inputs}>
            <div className={styles.input_field}>
              <label htmlFor="name">Tag Name</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="name"
                name="name"
                value={inputData?.name}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className={styles.submit_btn_wrapper}>
            {!loading ? (
              <SimpleFormButton
                name="Create"
                type="submit"
                onClick={handleSubmit}
                tooltip="Create new tag"
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

export default AddTagComponent;
