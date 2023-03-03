const singleUpload = async (file) => {
  if (!file) {
    return;
  }
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);
  data.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`);
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    return file;
  } catch (err) {
    console.log("Cloudinary error", err);
  }
};

const singleDelete = async (public_id = "liraaj0yb0pjuwerktt2") => {
  const data = new FormData();
  data.append("public_id", public_id);
  data.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);
  data.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`);
  data.append("api_key", `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`);
  data.append("api_secret", `${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/destroy`,
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log("delete file", file);
    return file;
  } catch (err) {
    console.log("Cloudinary error", err);
  }
};

const imageSizeCheck = (file) => {
  console.log(file);
  if (file.size > 1000000) {
    return false;
  }
  return true;
};

const blobToDataURL = (blob, setState) => {
  if (!blob) {
    setState(null);
    return;
  }

  let reader = new FileReader();
  reader.onload = (e) => {
    setState({
      file: e.target.result,
      name: blob.name,
      type: blob.type,
    });
  };
  reader.readAsDataURL(blob);
};

export { singleUpload, singleDelete, blobToDataURL, imageSizeCheck };
