import BlogCard from "@/components/BlogComp/BlogCard";
import DataNotFound from "@/components/FetchingResult/DataNotFound";
import styles from "@/styles/ReviewSlider.module.css";
import {
  Autoplay,
  EffectCoverflow,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Virtual,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const BlogSlider = ({ allBlog }) => {
  return (
    <div className={styles.slider_wrapper}>
      {Array.isArray(allBlog) ? (
        <Swiper
          effect={"coverflow"}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 60,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          keyboard={true}
          grabCursor={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            450: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1500: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          virtual
          modules={[
            EffectCoverflow,
            Autoplay,
            Navigation,
            Pagination,
            Mousewheel,
            Keyboard,
            Virtual,
          ]}
          className="blog_swiper"
        >
          {allBlog.map((item, idx) => (
            <SwiperSlide
              key={idx}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "100px",
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
