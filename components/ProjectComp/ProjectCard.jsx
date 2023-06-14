import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/ProjectCard.module.css";
import { Rating, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FaHeartbeat, FaRegHeart, FaSlideshare } from "react-icons/fa";
import { VscGithub, VscGithubInverted } from "react-icons/vsc";

const ProjectCard = ({ details }) => {
  const { currentColor, darkTheme } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: currentColor,
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <>
      <div className={`${conditionalMode} ${styles.card}`}>
        <div className={styles.fig_div}>
          {details?.thumb_img && (
            <Image
              className={styles.image}
              src={details?.thumb_img}
              alt={details?.name}
              layout="fill"
              objectFit="cover"
              priority
            />
          )}
          <div className={styles.hover_div}>
            <p
              style={{
                color: currentColor,
              }}
              className={styles.tag_title}
            >
              Techs
            </p>
            <hr />
            <div className={styles.tag}>
              {Array.isArray(details?.tags) &&
                details.tags.map((item, idx) => (
                  <p
                    key={idx}
                    style={{
                      background: currentColor,
                    }}
                  >
                    {item?.name}
                  </p>
                ))}
            </div>
            <div className={styles.btn_div}>
              <Link href={details?.live_site || ""} passHref>
                <span
                  title="Visit Live Site"
                  style={{
                    background: currentColor,
                  }}
                  className={styles.card_btn}
                >
                  <FaSlideshare />
                </span>
              </Link>
              <Link href={details?.client_repo || ""} passHref>
                <span
                  title="Visit Frontend Repo"
                  style={{
                    background: currentColor,
                  }}
                  className={styles.card_btn}
                >
                  <VscGithubInverted />
                </span>
              </Link>
              <Link href={details?.server_repo || ""} passHref>
                <span
                  title="Visit Backend Repo"
                  style={{
                    background: currentColor,
                  }}
                  className={styles.card_btn}
                >
                  <VscGithub />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.card_content}>
          <p className={styles.subtitle}>
            {Array.isArray(details.categories) && details.categories[0].name}{" "}
          </p>
          <h2 className={styles.title}>
            {details?.name?.length > 22
              ? `${details?.name.substring(0, 21)}...`
              : details?.name}
          </h2>
          <StyledRating
            className={styles.rating}
            name="customized-color"
            defaultValue={details?.ratings || 2}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.1}
            icon={<FaHeartbeat fontSize="inherit" />}
            emptyIcon={<FaRegHeart fontSize="inherit" />}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
