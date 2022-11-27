import SkillPaper from "@/components/SkillPaper/SkillPaper";
import styles from "@/styles/ReviewSlider.module.css";
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const ReviewSlider = ({ data }) => {
  return (
    <div className={styles.slider_wrapper}>
      <Swiper
        cssMode={true}
        autoplay={{
          delay: 800,
          disableOnInteraction: true,
        }}
        spaceBetween={20}
        mousewheel={true}
        keyboard={true}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          200: {
            slidesPerView: 3,
          },
          300: {
            slidesPerView: 4,
          },
          450: {
            slidesPerView: 5,
          },
          640: {
            slidesPerView: 6,
          },
          770: {
            slidesPerView: 8,
          },
          900: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 10,
          },
          1100: {
            slidesPerView: 12,
          },
        }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        className="skill_swiper"
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                marginBottom: "40px",
              }}
            >
              <SkillPaper tooltip={item?.name}>{item?.icon}</SkillPaper>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
