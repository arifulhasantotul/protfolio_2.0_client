import BlogCard from "@/components/BlogComp/BlogCard";
import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/Project.module.css";
import { Container } from "@mui/material";

const Blog = ({ blogs, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.project_page} ${conditionalMode}`}>
      <>
        <Container maxWidth="xl">
          <PageHeader title="All Blog" />
          <div className={styles.card_wrapper}>
            {Array.isArray(blogs) ? (
              blogs.map((item, idx) => <BlogCard key={idx} details={item} />)
            ) : (
              <DataNotFound title="Blogs not found" />
            )}
          </div>
        </Container>
      </>
    </div>
  );
};

export default Blog;
