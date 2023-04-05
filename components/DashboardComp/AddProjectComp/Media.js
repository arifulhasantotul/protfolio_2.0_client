import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { saveToLocalStorage } from "@/services/utils/temporarySave";
import { failedToast, infoToast } from "@/services/utils/toasts";
import styles from "@/styles/ProjectForm.module.css";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Media = ({ nextTab, accessToken, user }) => {
  const { currentColor, darkTheme, backend_url } = useStateContext();

  const initialData = {
    thumb_img: "",
    sub_images: "",
    live_site: "",
    client_repo: "",
    server_repo: "",
  };

  const [mediaData, setMediaData] = useState(initialData);
  const [errFormData, setErrFormData] = useState(initialData);
  const [imagesURL, setImagesURL] = useState([]);
  console.log("🚀 ~ file: Media.js:19 ~ Media ~ imagesURL:", imagesURL);

  const addImgUrl = () => {
    if (!mediaData.sub_img || !mediaData.sub_img.startsWith("https://")) {
      infoToast(darkTheme, "Invalid", "Please provide a valid image URL!");
      return;
    }
    setImagesURL((prv) => [...prv, mediaData.sub_img]);
    document.getElementById("sub_img").value = "";
    setMediaData((prv) => ({ ...prv, sub_img: "" }));
    setErrFormData((prv) => ({ ...prv, sub_img: "" }));
  };

  const removeUrl = (idx) => {
    const copyImagesURL = [...imagesURL];
    copyImagesURL.splice(idx, 1);
    setImagesURL(copyImagesURL);
  };

  const checkValidation = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === "server_repo") {
      if (!value) {
        setErrFormData((prv) => ({ ...prv, [name]: "" }));
      } else if (!value.startsWith("https://")) {
        setErrFormData((prv) => ({
          ...prv,
          [name]: "Please provide a secure link!",
        }));
      } else {
        setErrFormData((prv) => ({ ...prv, [name]: "" }));
      }
    } else if (name !== "sub_img") {
      if (!value) {
        setErrFormData((prv) => ({
          ...prv,
          [name]: "Please fill up this field",
        }));
      } else if (!value.startsWith("https://")) {
        setErrFormData((prv) => ({
          ...prv,
          [name]: "Please provide a secure link!",
        }));
      } else {
        setErrFormData((prv) => ({ ...prv, [name]: "" }));
      }
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMediaData((prv) => ({ ...prv, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        errFormData.thumb_img ||
        errFormData.live_site ||
        errFormData.client_repo ||
        errFormData.server_repo ||
        errFormData.sub_img
      ) {
        failedToast(darkTheme, "Please provide valid data!");
        return;
      }

      if (
        !mediaData.thumb_img ||
        !mediaData.live_site ||
        !mediaData.client_repo ||
        !imagesURL?.length > 0
      ) {
        failedToast(darkTheme, "Please fill all fields!");
        return;
      }
      const newData = {
        thumb_img: mediaData?.thumb_img || "",
        sub_images: imagesURL || [],
        live_site: mediaData?.live_site || "",
        client_repo: mediaData?.client_repo || "",
        server_repo: mediaData?.server_repo || "",
      };
      saveToLocalStorage("portfolioAddProjectMedia", newData);
      nextTab(3);
    } catch (err) {
      failedToast(darkTheme, err.message);
      console.log("🚀 ~ file: Media.js:111 ~ handleSubmit ~ err:", err);
    }
  };

  const handleClear = () => {
    setMediaData(initialData);
    setErrFormData(initialData);
    setImagesURL([]);
    document.getElementById("thumb_img").value = "";
    document.getElementById("sub_img").value = "";
    document.getElementById("live_site").value = "";
    document.getElementById("client_repo").value = "";
    document.getElementById("server_repo").value = "";
  };

  const conditionalMode = darkTheme ? styles.dark : styles.light;

  useEffect(() => {
    const data = localStorage.getItem("portfolioAddProjectMedia");
    if (data == null) return;
    const mediaData = JSON.parse(data);
    if (mediaData) {
      setMediaData({
        thumb_img: mediaData?.thumb_img,
        sub_img: "",
        live_site: mediaData?.live_site,
        client_repo: mediaData?.client_repo,
        server_repo: mediaData?.server_repo,
      });
      setImagesURL(mediaData?.sub_images);
    }
  }, []);
  /**
  0   
  https://i.ibb.co/bWSK1kF/01loginside.png
  1
  https://i.ibb.co/D4DQCWP/02login.png
  2
  https://i.ibb.co/M9qhdmg/03loginerr.png
  3
  https://i.ibb.co/kDFTTzN/04inbox1.png
  4
  https://i.ibb.co/hf42sgD/05inbox2.png
  5
  https://i.ibb.co/T13Fq10/06inbox3.png
  6
  https://i.ibb.co/fnbsLN0/07addCon.png
  7
  https://i.ibb.co/23JjbTd/08search-Con.png
  8
  https://i.ibb.co/r6tnKBD/09add-User-Form.png
  9
  https://i.ibb.co/3Tkw8zf/10add-User-Form2.png
  10
  https://i.ibb.co/d5cnhRf/11add-User-Form-Valid.png
  11
  https://i.ibb.co/ZdSsHNC/12user-Admin.png
  12
  https://i.ibb.co/HN05mmc/13user-Normal.png
*/

  return (
    <div className={conditionalMode}>
      <form onSubmit={handleSubmit} className={styles.form_wrapper}>
        <div className={styles.input_field}>
          <label htmlFor="thumb_img">Cover Image (URL)</label>
          <input
            style={{
              color: currentColor,
            }}
            type="text"
            name="thumb_img"
            id="thumb_img"
            value={mediaData?.thumb_img}
            placeholder="e.g: https://i.ibb.co/D4DQCWP/02login.png"
            onChange={handleInput}
            onBlur={checkValidation}
          />
        </div>
        {errFormData?.thumb_img && (
          <p className={styles.error}> &#9888; {errFormData?.thumb_img}</p>
        )}

        {imagesURL.length > 0 ? (
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
                  <IoMdCloseCircle
                    title="Remove category"
                    style={{
                      color: currentColor,
                    }}
                    className={styles.delete}
                    onClick={() => removeUrl(idx)}
                  />
                </span>
              ))}
            </div>
          </div>
        ) : null}
        <div className={styles.input_field}>
          <div className={styles.add_btn_url}>
            <label htmlFor="sub_img">Sub Image (URL)</label>
            <span
              title="Add to image list"
              style={{
                border: `2px solid ${currentColor}`,
                color: currentColor,
              }}
              className={styles.add_btn}
              onClick={addImgUrl}
            >
              + Add
            </span>
          </div>
          <input
            style={{
              color: currentColor,
            }}
            type="text"
            name="sub_img"
            id="sub_img"
            value={mediaData?.sub_img}
            placeholder="e.g: https://i.ibb.co/D4DQCWP/02login.png"
            onChange={handleInput}
          />
        </div>
        {errFormData?.sub_img && (
          <p className={styles.error}> &#9888; {errFormData?.sub_img}</p>
        )}
        <div className={styles.input_field}>
          <label htmlFor="live_site">Live site (URL)</label>
          <input
            style={{
              color: currentColor,
            }}
            type="text"
            name="live_site"
            id="live_site"
            value={mediaData?.live_site}
            placeholder="e.g: https://i.ibb.co/D4DQCWP/02login.png"
            onChange={handleInput}
            onBlur={checkValidation}
          />
        </div>
        {errFormData?.live_site && (
          <p className={styles.error}> &#9888; {errFormData?.live_site}</p>
        )}
        <div className={styles.input_field}>
          <label htmlFor="client_repo">Client Repo (URL)</label>
          <input
            style={{
              color: currentColor,
            }}
            type="text"
            name="client_repo"
            id="client_repo"
            value={mediaData?.client_repo}
            placeholder="e.g: https://i.ibb.co/D4DQCWP/02login.png"
            onChange={handleInput}
            onBlur={checkValidation}
          />
        </div>
        {errFormData?.client_repo && (
          <p className={styles.error}> &#9888; {errFormData?.client_repo}</p>
        )}
        <div className={styles.input_field}>
          <label htmlFor="server_repo">Server repo (URL)</label>
          <input
            style={{
              color: currentColor,
            }}
            type="text"
            name="server_repo"
            id="server_repo"
            value={mediaData?.server_repo}
            placeholder="e.g: https://i.ibb.co/D4DQCWP/02login.png"
            onChange={handleInput}
            onBlur={checkValidation}
          />
        </div>
        {errFormData?.server_repo && (
          <p className={styles.error}> &#9888; {errFormData?.server_repo}</p>
        )}
        {/* Submit button */}
        <div className={styles.submit_btn_wrapper}>
          <SimpleFormButton name="Previous" onClick={() => nextTab(1)} />
          <SimpleFormButton
            name="Reset"
            type="button"
            onClick={handleClear}
            tooltip="Clear all data"
          />
          <SimpleFormButton
            name="Next"
            type="submit"
            onClick={handleSubmit}
            tooltip="Save & Go to next page"
          />
        </div>
      </form>
    </div>
  );
};

export default Media;
