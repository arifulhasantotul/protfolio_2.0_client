import { useStateContext } from "@/context/ContextProvider";
import { UPDATE_USER_DETAILS } from "@/services/graphql/mutation";
import { failedToast, successToast } from "@/services/utils/toasts";
import { singleUpload } from "@/services/utils/uploadFunc";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const Profile = ({ userData }) => {
  const { darkTheme } = useStateContext();
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    dialCode: "",
    designation: "",
    phone: "",
    cloudinary_id: "",
  });

  const [updateUser] = useMutation(UPDATE_USER_DETAILS);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files) {
      setAvatarFile(e.target.files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      avatar: "",
      dialCode: "",
      designation: "",
      phone: "",
      cloudinary_id: "",
    });
    setAvatarFile(null);
    document.getElementById("avatar").value = "";
  };

  const handleImageHandler = async (e) => {
    e.preventDefault();
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
    }
  };
  return (
    <div>
      <h2>This is profile page</h2>
      <form onSubmit={handleImageHandler}>
        <input onChange={handleChange} type="file" name="avatar" id="avatar" />
        <br /> <br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default Profile;
