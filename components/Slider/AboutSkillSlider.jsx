import CircularProgressBar from "@/components/CustomCircularProgressBar/CircularProgressBar";
import styles from "@/styles/ReviewSlider.module.css";
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const AboutSkillSlider = ({ data }) => {
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
            slidesPerView: 1.5,
          },
          300: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 2.5,
          },
        }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        className="skill_swiper"
        style={{
          paddingBottom: "40px",
        }}
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                marginBottom: "40px",
              }}
            >
              <CircularProgressBar
                title={item?.title}
                percentage={item?.percentage}
                color={item?.color}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutSkillSlider;
