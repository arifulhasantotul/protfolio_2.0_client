import SimpleButton from "@/components/SimpleButton/SimpleButton";
import styles from "@/styles/ReviewSlider.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "../Review/Review";

const ReviewSlider = ({ data }) => {
  return (
    <div className={styles.slider_wrapper}>
      <div className={styles.btn}>
        <SimpleButton tooltip="Previous review" swiperClassName="custom_prev">
          {" "}
          <AiOutlineArrowLeft
            style={{
              width: "25px",
              height: "25px",
            }}
          />{" "}
        </SimpleButton>
        <SimpleButton tooltip="Next review" swiperClassName="custom_next">
          {" "}
          <AiOutlineArrowRight
            style={{
              width: "25px",
              height: "25px",
            }}
          />{" "}
        </SimpleButton>
      </div>
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
