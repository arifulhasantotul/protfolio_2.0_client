import { UPDATE_USER_DETAILS } from "@/services/graphql/mutation";
import { singleUpload } from "@/services/utils/uploadFunc";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const Profile = ({ userData }) => {
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

  const handleImageHandler = async (e) => {
    e.preventDefault();
    try {
      const uploadedData = await singleUpload(avatarFile);

      setFormData((prev) => ({
        ...prev,
        ["avatar"]: uploadedData?.secure_url,
        ["cloudinary_id"]: uploadedData?.public_id,
      }));

      console.log("cloud", uploadedData);
      await updateProfileHandler();
    } catch (err) {
      console.log("Error at handleImageHandler", err);
    }
  };

  console.log(formData);
  console.log("avatarFile", avatarFile);
  console.log("userData", userData);
  const updateProfileHandler = async () => {
    // e.preventDefault();
    try {
      const newData = {
        name: formData?.name || userData?.name,
        avatar: formData?.avatar || userData?.avatar,
        dialCode: formData?.dialCode || userData?.dialCode,
        designation: formData?.designation || userData?.designation,
        phone: formData?.phone || userData?.phone,
        cloudinary_id: formData?.cloudinary_id || userData?.cloudinary_id,
      };
      const { data } = updateUser({
        variables: {
          id: userData?.id,
          input: newData,
        },
      });
      console.log("update data", data);
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
