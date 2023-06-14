import DataNotFound from "@/components/FetchingResult/DataNotFound";
import BlogSlider from "@/components/Slider/BlogSlider";
import { useStateContext } from "@/context/ContextProvider";
import { validArray } from "@/services/utils/common";
import styles from "@/styles/HomeProjects.module.css";

const HomeBlogs = ({ blogs }) => {
  const { currentColor, darkTheme, screenSize } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.project_card}`}>
      <div className={styles.card_wrapper}>
        {validArray(blogs) ? (
          <BlogSlider allBlog={blogs} />
        ) : (
          <DataNotFound title="Blogs not found" />
        )}
      </div>
    </div>
  );
};

export default HomeBlogs;
