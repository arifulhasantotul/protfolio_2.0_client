import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/BlogsComponent.module.css";
import { Container } from "@mui/material";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const BlogsComponent = ({ blogs }) => {
  const { currentColor, darkTheme } = useStateContext();

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
              {Array.isArray(blogs)
                ? blogs.map((blog, idx) => (
                    <tr key={idx}>
                      <td>{blog.name}</td>
                      <td className={styles.t_data_center}>
                        <MdEdit className={styles.icon} title="Edit blog" />
                        <MdDeleteOutline
                          className={styles.icon}
                          title="Delete category"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!Array.isArray(blogs) && (
            <DataNotFound title="Categories not found" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default BlogsComponent;
