import styles from "@/styles/ReviewSlider.module.css";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "@/components/Review/Review";

const ReviewSlider = ({ data }) => {
  return (
    <div className={styles.slider_wrapper}>
      <Swiper
        cssMode={true}
        navigation={{
          nextEl: ".custom_next",
          prevEl: ".custom_prev",
        }}
        mousewheel={true}
        keyboard={true}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="review_swiper"
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Review review={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
