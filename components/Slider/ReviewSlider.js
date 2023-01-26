import Review from "@/components/ReviewComp/Review";
import styles from "@/styles/ReviewSlider.module.css";
import { Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const ReviewSlider = ({ allReview }) => {
  console.log(allReview);

  return (
    <div className={styles.slider_wrapper}>
      <Swiper
        cssMode={true}
        navigation={{
          nextEl: ".custom_next",
          prevEl: ".custom_prev",
        }}
        // mousewheel={true}
        keyboard={true}
        // grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[
          Navigation,
          Pagination,
          // Mousewheel,
          Keyboard,
        ]}
        className="review_swiper"
      >
        {allReview.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Review review={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
