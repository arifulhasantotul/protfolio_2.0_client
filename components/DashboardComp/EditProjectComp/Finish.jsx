import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { UPDATE_PROJECT } from "@/services/graphql/mutation";
import { failedToast, successToast } from "@/services/utils/toasts";
import styles from "@/styles/ProjectForm.module.css";
import { useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const QuillEditor = dynamic(() => import("@/components/Editor/QuillEditor"), {
  ssr: false,
});

const EditFinish = ({
  projectData,
  categories,
  tags,
  clients,
  nextTab,
  accessToken,
  user,
}) => {
  const { currentColor, darkTheme } = useStateContext();
  const router = useRouter();
  const initialData = {
    name: "",
    slug: "",
    des: "",
    rank: 0,
    categoriesId: [],
    tagsId: [],
    ratings: 0,
    status: "Not_Started",
    clientId: "",
    thumb_img: "",
    sub_images: [],
    live_site: "",
    client_repo: "",
    server_repo: "",
  };

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

  const [finishData, setFinishData] = useState(initialData);
  const [finishLoading, setFinishLoading] = useState(false);
  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT);

  const [richTextValue, setRichTextValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsId, setSelectedTagsId] = useState([]);

  // matching two arrays for showing selected items
  const getMatch = (arrayOfObj, arrayOfId, setArrayFunc) => {
    const matchedArr = [];
    for (let i = 0; i < arrayOfObj?.length; i++) {
      for (let j = 0; j < arrayOfId.length; j++) {
        if (arrayOfObj[i].id === arrayOfId[j]) {
          matchedArr.push(arrayOfObj[i]);
        }
      }
    }
    setArrayFunc(matchedArr);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFinishLoading(true);
    try {
      const newData = {
        ...finishData,
        sub_images: imagesURL,
      };
      const { data } = await updateProject({
        variables: {
          id: projectData?.id,
          input: newData,
        },
      });

      if (data?.updateProject?.id) {
        successToast(darkTheme, "Project updated successfully. 😊");
        localStorage.removeItem("portfolioEditProjectBasic");
        localStorage.removeItem("portfolioEditProjectMedia");
        router.push("/dashboard/projects");
        nextTab(1);
      }
    } catch (err) {
      failedToast(darkTheme, err.message);
      console.log("❌ Error in AddProjectComp/Basic.js line 187", err);
    } finally {
      setFinishLoading(false);
    }
  };

  useEffect(() => {
    setFinishLoading(true);
    const b_data = localStorage.getItem("portfolioEditProjectBasic");
    const m_data = localStorage.getItem("portfolioEditProjectMedia");
    const parsedContent = {};
    const mediaData = {};
    if (b_data !== null) {
      parsedContent = JSON.parse(b_data);
    }
    if (m_data !== null) {
      mediaData = JSON.parse(m_data);
    }

    setFinishData({
      ...finishData,
      name: parsedContent?.name,
      slug: parsedContent?.slug,
      des: parsedContent?.des,
      rank: parsedContent?.rank,
      categoriesId: parsedContent?.categoriesId,
      tagsId: parsedContent?.tagsId,
      ratings: parsedContent?.ratings,
      status: parsedContent?.status,
      clientId: parsedContent?.clientId,
      thumb_img: mediaData?.thumb_img,
      live_site: mediaData?.live_site,
      client_repo: mediaData?.client_repo,
      server_repo: mediaData?.server_repo,
    });

    setSelectedCategoriesId(parsedContent?.categoriesId);
    setSelectedTagsId(parsedContent?.tagsId);
    setRichTextValue(parsedContent?.des);
    setFinishLoading(false);

    setImagesURL(mediaData?.sub_images);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!finishLoading]);

  useEffect(() => {
    if (Array.isArray(selectedCategoriesId)) {
      getMatch(categories, selectedCategoriesId, setSelectedCategories);
    }
    if (Array.isArray(selectedTagsId)) {
      getMatch(tags, selectedTagsId, setSelectedTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoriesId, selectedTagsId]);

  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={conditionalMode}>
      <form onSubmit={handleUpdate} className={styles.form_wrapper}>
        <div className={styles.half_width_inputs}>
          <div className={styles.input_field}>
            <label htmlFor="name">
              Name{" "}
              <span
                className={styles.red_color}
              >{`(Unique name required!)`}</span>
            </label>
            <span
              style={{
                color: currentColor,
                display: "flex",
                alignItems: "center",
              }}
              className={styles.input}
            >
              {finishData.name}
            </span>
          </div>
          <div className={styles.input_field}>
            <label htmlFor="name">Slug Id</label>
            <span
              style={{
                color: currentColor,
                display: "flex",
                alignItems: "center",
              }}
              className={styles.input}
            >
              {finishData.slug}
            </span>
          </div>
          <div className={styles.input_field}>
            <label htmlFor="name">Rank</label>
            <span
              style={{
                color: currentColor,
                display: "flex",
                alignItems: "center",
              }}
              className={styles.input}
            >
              {finishData.rank}
            </span>
          </div>
          <div className={styles.input_field}>
            <label htmlFor="name">Ratings</label>
            <span
              style={{
                color: currentColor,
                display: "flex",
                alignItems: "center",
              }}
              className={styles.input}
            >
              {finishData.ratings}
            </span>
          </div>
          <div className={styles.input_field}>
            <label htmlFor="status">Status</label>
            <span
              style={{
                color: currentColor,
                display: "flex",
                alignItems: "center",
              }}
              className={styles.input}
            >
              {statusOptions.map((opt, idx) => (
                <span key={idx}>
                  {opt.value === finishData.status ? opt.label : ""}
                </span>
              ))}
            </span>
          </div>
          <div className={styles.input_field}>
            <label htmlFor="status">Client</label>
            <span
              style={{
                color: currentColor,
                display: "flex",
                alignItems: "center",
              }}
              className={styles.input}
            >
              {clients.map((opt, idx) => (
                <span key={idx}>
                  {opt.id === finishData.clientId ? opt.name : ""}
                </span>
              ))}
            </span>
          </div>
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
                    {item?.name}{" "}
                  </span>
                ))}
              </div>
            )}
          </div>
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
                    #{item?.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.input_field}>
          <label htmlFor="status">Cover Image (URL)</label>
          <span
            style={{
              color: currentColor,
              display: "flex",
              alignItems: "center",
            }}
            className={styles.input}
          >
            {finishData.thumb_img}
          </span>
        </div>
        {Array.isArray(imagesURL) ? (
          <div className={styles.input_field}>
            <label>Sub Images List</label>
            <div className={styles.selected_array}>
              {imagesURL?.map((item, idx) => (
                <span
                  style={{
                    background: currentColor,
                  }}
                  className={styles.selected_item}
                  key={idx}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        <div className={styles.input_field}>
          <label htmlFor="status">Live Site (URL)</label>
          <span
            style={{
              color: currentColor,
              display: "flex",
              alignItems: "center",
            }}
            className={styles.input}
          >
            {finishData.live_site}
          </span>
        </div>
        <div className={styles.input_field}>
          <label htmlFor="status">Client repo (URL)</label>
          <span
            style={{
              color: currentColor,
              display: "flex",
              alignItems: "center",
            }}
            className={styles.input}
          >
            {finishData.client_repo}
          </span>
        </div>
        <div className={styles.input_field}>
          <label htmlFor="status">Server repo (URL)</label>
          <span
            style={{
              color: currentColor,
              display: "flex",
              alignItems: "center",
            }}
            className={styles.input}
          >
            {finishData.server_repo}
          </span>
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
            // setValue={setRichTextValue}
            // onBlur={() => handleRichText(richTextValue)}
            readOnly={true}
          />
        </div>
        <div className={styles.submit_btn_wrapper}>
          <SimpleFormButton name="Previous" onClick={() => nextTab(2)} />
          <SimpleFormButton
            name="Next"
            type="submit"
            onClick={handleUpdate}
            tooltip="Save & Go to next page"
          ></SimpleFormButton>
        </div>
      </form>
    </div>
  );
};

export default EditFinish;
