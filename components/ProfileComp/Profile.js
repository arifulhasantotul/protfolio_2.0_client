// import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import NumberDropdown from "@/components/NumberDropdown/NumberDropdown";
import { useStateContext } from "@/context/ContextProvider";
import defaultImage from "@/public/images/def_review.png";
import { UPDATE_USER_DETAILS } from "@/services/graphql/mutation";
import countryDetails from "@/services/utils/countriesData.json";
import { failedToast, successToast } from "@/services/utils/toasts";
import { blobToDataURL, singleUpload } from "@/services/utils/uploadFunc";
import styles from "@/styles/Profile.module.css";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdClose, MdEdit, MdUpload } from "react-icons/md";
import Switch from "react-switch";
import SimpleFormButton from "../SimpleButton/SimpleFormButton";

const Profile = ({ userData }) => {
  const router = useRouter();
  const { currentColor, darkTheme } = useStateContext();
  const [avatarFile, setAvatarFile] = useState(null);
  const [updateComp, setUpdateComp] = useState(false);

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
      blobToDataURL(files[0], setAvatarFile);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClearImg = () => {
    setFormData((prv) => ({ ...prv, avatar: "" }));
    setAvatarFile(null);
    document.getElementById("avatar").value = "";
  };

  const handleReset = () => {
    setFormData(initialData);
    setAvatarFile(null);
    document.getElementById("avatar").value = "";
  };

  const handleImageHandler = async (e) => {
    e.preventDefault();
    if (errFormData?.name || errFormData?.phone || errFormData?.country) {
      failedToast(darkTheme, "Please provide valid data!");
      return;
    }

    if (formData.phone && formData?.phone?.length !== formData?.numLen) {
      setErrFormData((prv) => ({
        ...prv,
        phone: "Invalid phone number!",
      }));
      failedToast(darkTheme, "Invalid phone number");
      return;
    }
    try {
      if (avatarFile) {
        const uploadedData = await singleUpload(avatarFile);
        successToast(darkTheme, "Image updated successfully");

        await updateProfileHandler(
          uploadedData?.secure_url,
          uploadedData?.public_id
        );
        successToast(darkTheme, "Profile updated successfully!");
        handleReset();
      } else {
        const data = await updateProfileHandler();
        console.log("db data", data);
        successToast(darkTheme, "Profile updated successfully!");
        handleReset();
      }
      router.replace("/");
    } catch (err) {
      console.log("Error at handleImageHandler", err);
      failedToast(darkTheme, err.message);
    }
  };

  const updateProfileHandler = async (avatarURL = "", cloudinaryID = "") => {
    // e.preventDefault();
    try {
      const newData = {
        name: formData?.name || userData?.name,
        avatar: avatarURL || formData?.avatar || userData?.avatar,
        dialCode: formData?.dialCode || userData?.dialCode,
        designation: formData?.designation || userData?.designation,
        phone: formData?.phone || userData?.phone,
        flag: formData?.flag || userData?.flag,
        country: formData?.country || userData?.country,
        numLen: formData?.numLen || userData?.numLen,
        cloudinary_id:
          cloudinaryID || formData?.cloudinary_id || userData?.cloudinary_id,
      };
      const { data } = await updateUser({
        variables: {
          id: userData?.id,
          input: newData,
        },
      });
      console.log("update data", data);
      return data;
    } catch (err) {
      console.log("Error at updateProfileHandler", err);
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
          <form className={styles.form_wrapper} onSubmit={handleImageHandler}>
            <div className={styles.avatar_wrapper}>
              {avatarFile?.file && (
                <span onClick={handleClearImg} className={styles.close_icon}>
                  <MdClose />
                </span>
              )}
              <div className={styles.avatar_div}>
                <Image
                  src={avatarFile?.file || userData?.avatar || defaultImage}
                  layout="fill"
                  alt="Profile Image"
                />
              </div>
            </div>
            <div className={styles.input_field}>
              <label className={styles.fileLabel} htmlFor="avatar">
                <MdUpload /> <span>Upload Avatar</span>
              </label>
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
