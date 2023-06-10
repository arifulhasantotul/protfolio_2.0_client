import BlogSlider from "@/components/Slider/BlogSlider";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/HomeProjects.module.css";

const HomeBlogs = ({ blogs }) => {
  const { currentColor, darkTheme, screenSize } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.project_card}`}>
      <div className={styles.card_wrapper}>
        <BlogSlider allBlog={blogs} />
      </div>
    </div>
  );
};

export default HomeBlogs;
