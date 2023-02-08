const singleUpload = async (file) => {
  if (!file) {
    return;
  }
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "portfolio2");
  data.append("cloud_name", "totulmediauploadapi");
  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/totulmediauploadapi/image/upload",
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

export { singleUpload };
