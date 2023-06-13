import CustomModal from "@/components/CustomModal/CustomModal";
import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import { DELETE_BLOG, UPDATE_BLOG } from "@/services/graphql/mutation";
import { ALL_BLOGS } from "@/services/graphql/queries";
import {
  confirmModal,
  failedToast,
  successToast,
} from "@/services/utils/toasts";
import styles from "@/styles/BlogsComponent.module.css";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { swrFetcher } from "apolloClient";
import { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import useSWR from "swr";
import UpdateBlogComponent from "./UpdateBlogComponent";

const BlogsComponent = ({ initBlogs, categories, tags, accessToken }) => {
  const { currentColor, darkTheme, screenSize } = useStateContext();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [updateBlog, { loading }] = useMutation(UPDATE_BLOG);
  const [deleteBlog, { loading: deleteLoading }] = useMutation(DELETE_BLOG);

  const fetcher = async () => {
    const { listBlog } = await swrFetcher(accessToken, ALL_BLOGS, {});
    return listBlog;
  };

  const { data, mutate, error } = useSWR([ALL_BLOGS, {}], fetcher, {
    initialData: initBlogs,
    revalidateOnFocus: false,
  });

  // formData to store changed values
  const initialData = {
    id: "",
    name: "",
    blog_url: "",
    img: "",
    categoriesId: [],
    categories: [],
    tagsId: [],
    categories: [],
  };
  const [blogData, setBlogData] = useState(initialData);

  const handleDelete = async (id) => {
    const confirm = await confirmModal(
      darkTheme,
      "Are you sure to delete this blog?"
    );
    if (!confirm) return;
    try {
      const { data } = await deleteBlog({
        variables: {
          id,
        },
      });

      if (data?.deleteBlog?.id) {
        successToast(darkTheme, "Blog deleted successfully");
        mutate();
      }
    } catch (err) {
      console.log("🚀 ~ file: BlogComponent.jsx:94 ~ handleUpdate ~ err:", err);
      failedToast(darkTheme, err.message);
    }
  };

  const handleEdit = (item) => {
    if (!item) return;
    setBlogData((prv) => ({
      ...prv,
      id: item?.id,
      name: item?.name,
      blog_url: item?.blog_url,
      img: item?.img,
      categoriesId: item?.categoriesId,
      tagsId: item?.tagsId,
      categories: item?.categories,
      tags: item?.tags,
    }));

    handleOpenModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateBlog({
        variables: {
          id: blogData?.id,
          input: {
            name: blogData?.name,
            blog_url: blogData?.blog_url,
            img: blogData?.img,
            categoriesId: blogData?.categoriesId,
            tagsId: blogData?.tagsId,
          },
        },
      });

      if (data?.updateBlog?.id) {
        successToast(darkTheme, "Blog updated successfully");
        handleCloseModal();
        mutate();
        setBlogData(initialData);
      }
    } catch (err) {
      console.log("🚀 ~ file: BlogComponent.jsx:94 ~ handleUpdate ~ err:", err);
      failedToast(darkTheme, err.message);
    }
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.blogs_table_wrapper}`}>
      <Container maxWidth="lg">
        <PageHeader title="Blogs" />

        <div
          className={styles.table_container}
          style={{
            color: currentColor,
          }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th className={styles.t_data_center}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data)
                ? data.map((blog, idx) => (
                    <tr key={idx}>
                      <td>{blog.name}</td>
                      <td className={styles.t_data_center}>
                        <MdEdit
                          onClick={() => handleEdit(blog)}
                          className={styles.icon}
                          title="Edit blog"
                        />
                        <MdDeleteOutline
                          onClick={() => handleDelete(blog.id)}
                          className={styles.icon}
                          title="Delete blog"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!Array.isArray(data) && <DataNotFound title="Blogs not found" />}
        </div>
      </Container>

      <CustomModal
        open={openModal}
        handleClose={handleCloseModal}
        width={screenSize > 605 ? "max-content" : "100%"}
        padding={screenSize > 700 ? "10px" : "15px 0"}
      >
        <UpdateBlogComponent
          categories={categories}
          tags={tags}
          blogData={blogData}
          setBlogData={setBlogData}
          handleUpdate={handleUpdate}
          closeModal={handleCloseModal}
          loading={loading}
        />
      </CustomModal>
    </div>
  );
};

export default BlogsComponent;
