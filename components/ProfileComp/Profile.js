import DataLoading from "@/components/FetchingResult/DataLoading";
import NumberDropdown from "@/components/NumberDropdown/NumberDropdown";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import defaultImage from "@/public/images/def_review.png";
import {
  UPDATE_PROFILE_IMAGE,
  UPDATE_USER_DETAILS,
} from "@/services/graphql/mutation";
import countryDetails from "@/services/utils/countriesData.json";
import { failedToast, successToast } from "@/services/utils/toasts";
import { blobToDataURL } from "@/services/utils/uploadFunc";
import styles from "@/styles/Profile.module.css";
import { useMutation } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdCameraEnhance, MdClose, MdEdit, MdUpload } from "react-icons/md";
import Switch from "react-switch";

const Profile = ({ tokenData }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(tokenData);
  const { currentColor, darkTheme } = useStateContext();
  const [previewImg, setPreviewImg] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [updateComp, setUpdateComp] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFormUploading, setIsFormUploading] = useState(false);

  const initialData = {
    name: "",
    avatar: "",
    dialCode: "",
    designation: "",
    phone: "",
    flag: "",
    cloudinary_id: "",
    numLen: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errFormData, setErrFormData] = useState(initialData);

  const [updateUser] = useMutation(UPDATE_USER_DETAILS);
  const [uploadProfileImg] = useMutation(UPDATE_PROFILE_IMAGE, {
    onCompleted: (data) => {
      successToast(darkTheme, "Profile image updated successfully!");
      return data?.uploadProfileImg;
    },
  });

  const checkValidation = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (!value) {
        setErrFormData((prv) => ({ ...prv, name: " Name required!" }));
      } else if (value?.length < 3) {
        setErrFormData((prv) => ({
          ...prv,
          name: "Name should be minimum 3 characters long",
        }));
      } else {
        setErrFormData((prv) => ({ ...prv, name: "" }));
      }
    }

    if (name === "phone") {
      if (value || formData?.country || formData?.dialCode) {
        if (!value) {
          setErrFormData((prv) => ({
            ...prv,
            phone: "Phone number required!",
          }));
        } else if (value?.length < formData?.numLen) {
          setErrFormData((prv) => ({
            ...prv,
            phone: `Phone number should be minimum ${formData?.numLen} characters long`,
          }));
        } else {
          setErrFormData((prv) => ({ ...prv, phone: "" }));
        }

        if (!formData?.country) {
          setErrFormData((prv) => ({
            ...prv,
            country: "Please select a country!",
          }));
        } else {
          setErrFormData((prv) => ({ ...prv, country: "" }));
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files) {
      blobToDataURL(files[0], setPreviewImg);
      setAvatarFile(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClearImg = () => {
    setFormData((prv) => ({ ...prv, avatar: "" }));
    setPreviewImg(null);
    setAvatarFile(null);
    document.getElementById("avatar").value = "";
  };

  const handleReset = () => {
    setFormData(initialData);
    setPreviewImg(null);
    setAvatarFile(null);
    document.getElementById("avatar").value = "";
  };

  const handleImageUpload = async () => {
    setIsUploading(true);
    try {
      if (!avatarFile) return;
      const { data } = await uploadProfileImg({
        variables: {
          file: avatarFile,
        },
      });
      if (data) {
        setUserData((prv) => ({
          ...prv,
          avatar: data?.uploadProfileImg?.avatar,
          cloudinary_id: data?.uploadProfileImg?.cloudinary_id,
        }));
      }
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      console.log("❌ Error in Profile.js/handleImageUpload ❌\n", err);
      failedToast(darkTheme, "Image uploading failed!");
    } finally {
      handleClearImg();
      setIsUploading(false);
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setIsFormUploading(true);
    if (errFormData?.name || errFormData?.phone || errFormData?.country) {
      failedToast(darkTheme, "Please provide valid data!");
      return;
    }

    if (formData.phone && formData?.phone?.length !== formData?.numLen) {
      setErrFormData((prv) => ({
        ...prv,
        phone: `Invalid phone number! (Provide ${formData?.numLen}) characters`,
      }));
      failedToast(darkTheme, "Invalid phone number");
      return;
    }
    try {
      const newData = {
        name: formData?.name || userData?.name,
        dialCode: formData?.dialCode || userData?.dialCode,
        designation: formData?.designation || userData?.designation,
        phone: formData?.phone || userData?.phone,
        flag: formData?.flag || userData?.flag,
        country: formData?.country || userData?.country,
        numLen: formData?.numLen || userData?.numLen,
      };
      const { data } = await updateUser({
        variables: {
          id: userData?.id,
          input: newData,
        },
      });
      if (data) {
        setUserData((prv) => ({
          ...prv,
          name: data?.updateUser?.name,
          phone: data?.updateUser?.phone,
          designation: data?.updateUser?.designation,
          country: data?.updateUser?.country,
          flag: data?.updateUser?.flag,
          dialCode: data?.updateUser?.dialCode,
          numLen: data?.updateUser?.numLen,
        }));
      }
      setIsFormUploading(false);
      successToast(darkTheme, "Profile updated successfully!");
    } catch (err) {
      setIsFormUploading(false);
      console.log("❌ Error at Profile.js/updateProfileHandler ❌\n", err);
      failedToast(darkTheme, err.message);
    }
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData?.name || "",
        avatar: userData?.avatar || "",
        dialCode: userData?.dialCode || "",
        designation: userData?.designation || "",
        phone: userData?.phone || "",
        cloudinary_id: userData?.cloudinary_id || "",
        flag: userData?.flag || "",
        country: userData?.country || "",
        numLen: userData?.numLen ? parseInt(userData?.numLen) : "",
      }));
    }
    // singleDelete();
  }, [userData]);
  return (
    <div className={`${conditionalMode} ${styles.profile_wrapper}`}>
      {!updateComp ? (
        <>
          <div className={styles.form_div}>
            <div className={styles.upper_div_wrapper}>
              <div className={styles.avatar_div}>
                <Image
                  src={userData?.avatar || defaultImage}
                  layout="fill"
                  alt="Profile Image"
                />
              </div>
            </div>
            <div className={styles.input_div_wrapper}>
              <div className={styles.input_div}>
                <p>{userData?.name}</p>
              </div>
              <div className={styles.input_div}>
                <p>{userData?.email}</p>
              </div>
              <div className={styles.input_div}>
                <p>
                  {userData?.dialCode}
                  {userData?.phone}
                </p>
              </div>
              <div className={styles.input_div}>
                <p>{userData?.designation}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        // update profile form
        <>
          <form className={styles.form_wrapper} onSubmit={updateProfileHandler}>
            <div className={styles.avatar_wrapper}>
              {!isUploading && avatarFile?.name && (
                <span onClick={handleClearImg} className={styles.close_icon}>
                  <MdClose />
                </span>
              )}
              <div className={styles.avatar_div}>
                <Image
                  src={previewImg?.file || userData?.avatar || defaultImage}
                  layout="fill"
                  alt="Profile Image"
                />
              </div>
              <label
                className={styles.fileLabel}
                style={{
                  border: `2px solid ${currentColor}`,
                }}
                htmlFor="avatar"
              >
                <MdCameraEnhance
                  style={{
                    fill: currentColor,
                  }}
                />
              </label>
            </div>
            <div className={styles.input_field}>
              {avatarFile && !isUploading && !isFormUploading ? (
                <span onClick={handleImageUpload} className={styles.fileUpload}>
                  <MdUpload /> <span>Upload Avatar</span>
                </span>
              ) : avatarFile && isUploading && !isFormUploading ? (
                <span onClick={handleImageUpload} className={styles.fileUpload}>
                  <CircularProgress
                    size={20}
                    style={{
                      color: currentColor,
                    }}
                  />
                </span>
              ) : null}
              <input
                onChange={handleChange}
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                style={{
                  display: "none",
                }}
              />
            </div>
            <div className={styles.input_field}>
              <label htmlFor="name">Name</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="name"
                name="name"
                value={formData?.name || userData?.name}
                onChange={handleChange}
                onBlur={checkValidation}
              />
            </div>
            {errFormData?.name && (
              <p className={styles.error}> &#9888; {errFormData?.name}</p>
            )}
            <div className={styles.input_field}>
              <label htmlFor="email">Email</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="email"
                name="email"
                defaultValue={userData?.email}
                disabled
              />
            </div>
            <div className={styles.input_field}>
              <label htmlFor="">Country</label>
              <NumberDropdown
                countryData={countryDetails}
                setFormData={setFormData}
                selectedCountry={formData?.country}
              />
            </div>
            {errFormData?.country && (
              <p className={styles.error}> &#9888; {errFormData?.country}</p>
            )}
            <div className={styles.input_num_field}>
              <label htmlFor="phone">Phone</label>
              <div className={styles.num_div}>
                <div className={styles.flag_div}>
                  {formData?.flag && (
                    <Image
                      src={formData?.flag}
                      alt={"flag"}
                      width={30}
                      height={20}
                    />
                  )}
                </div>
                {formData?.dialCode ? (
                  <div className={styles.input_div}>
                    <span
                      className={styles.dialCode}
                      style={{
                        color: currentColor,
                      }}
                    >
                      {formData.dialCode}
                    </span>
                    <input
                      className={styles.phone}
                      style={{
                        color: currentColor,
                      }}
                      type="number"
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                      onBlur={checkValidation}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            {errFormData?.phone && (
              <p className={styles.error}> &#9888; {errFormData?.phone}</p>
            )}
            <div className={styles.input_field}>
              <label htmlFor="designation">Designation</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                onBlur={checkValidation}
              />
            </div>

            {!isUploading && !isFormUploading ? (
              <div className={styles.submit_btn_wrapper}>
                <SimpleFormButton
                  tooltip="Update Profile"
                  type="button"
                  name="Reset"
                  onClick={handleReset}
                ></SimpleFormButton>
                <SimpleFormButton
                  tooltip="Update Profile"
                  type="submit"
                  name="Update"
                ></SimpleFormButton>
              </div>
            ) : !isUploading && isFormUploading ? (
              <DataLoading />
            ) : null}
          </form>
        </>
      )}

      <div className={styles.edit_div}>
        <p>Edit profile ?</p>{" "}
        <Switch
          checked={updateComp}
          onChange={() => setUpdateComp((prev) => !prev)}
          offColor={!darkTheme ? "#fff" : "#3c3e41"}
          onColor={!darkTheme ? "#d1d9e6" : "#3c3e41"}
          offHandleColor={currentColor}
          onHandleColor={darkTheme ? "#fff" : "#3c3e41"}
          uncheckedIcon={<MdEdit className={styles.edit_icon} />}
          checkedIcon={<MdClose className={styles.edit_icon} />}
        />
      </div>
    </div>
  );
};

export default Profile;
