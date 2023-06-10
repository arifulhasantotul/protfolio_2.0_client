import BlogCard from "@/components/BlogComp/BlogCard";
import DataNotFound from "@/components/FetchingResult/DataNotFound";
import styles from "@/styles/ReviewSlider.module.css";
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const BlogSlider = ({ allBlog }) => {
  return (
    <div className={styles.slider_wrapper}>
      {Array.isArray(allBlog) ? (
        <Swiper
          cssMode={true}
          mousewheel={true}
          keyboard={true}
          grabCursor={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
          className="project_swiper"
        >
          {allBlog.map((item, idx) => (
            <SwiperSlide
              key={idx}
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 20,
              }}
            >
              <BlogCard details={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <DataNotFound title="Blogs not found" />
      )}
    </div>
  );
};

export default BlogSlider;
