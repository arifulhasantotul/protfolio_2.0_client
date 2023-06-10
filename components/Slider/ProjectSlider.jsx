import styles from "@/styles/ReviewSlider.module.css";
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import DataNotFound from "../FetchingResult/DataNotFound";
import ProjectCard from "../ProjectComp/ProjectCard";

const ProjectSlider = ({ allProject }) => {
  return (
    <div className={styles.slider_wrapper}>
      {Array.isArray(allProject) ? (
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
          {allProject.map((item, idx) => (
            <SwiperSlide
              key={idx}
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: 20,
              }}
            >
              <ProjectCard details={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <DataNotFound title="Projects not found" />
      )}
    </div>
  );
};

export default ProjectSlider;
