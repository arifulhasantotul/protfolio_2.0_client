import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/HomeProjects.module.css";
import { gql, useQuery } from "@apollo/client";
import { Rating, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FaHeartbeat, FaRegHeart, FaSlideshare } from "react-icons/fa";
import { VscGithub, VscGithubInverted } from "react-icons/vsc";
import ImgSrc from "./02login.png";

// Fetching all projects using graphql
const ALL_PROJECTS = gql`
  query AllProjects {
    listProjects {
      id
      name
      categories
      des
      clientId
    }
  }
`;

const HomeProjects = ({
  name,
  img,
  tooltip,
  live_link = "",
  client_repo = "",
  server_repo = "",
}) => {
  const { currentColor, darkTheme } = useStateContext();
  const { loading, error, data } = useQuery(ALL_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong(</p>;
  if (!loading && !error) {
    console.log(data.listProjects);
  }

  // css conditionalMode for dark mode
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
    <div className={`${conditionalMode} ${styles.project_card}`}>
      <div className={styles.card_wrapper}>
        <div className={styles.fig_div}>
          <Image
            className={styles.image}
            src={ImgSrc}
            alt=""
            layout="fill"
            objectFit="cover"
          />
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
              <p
                style={{
                  background: currentColor,
                }}
              >
                Node js
              </p>
              <p
                style={{
                  background: currentColor,
                }}
              >
                React
              </p>
              <p
                style={{
                  background: currentColor,
                }}
              >
                MongoDB and Mongoose
              </p>
              <p
                style={{
                  background: currentColor,
                }}
              >
                Socket.io
              </p>
              <p
                style={{
                  background: currentColor,
                }}
              >
                ejs
              </p>
              <p
                style={{
                  background: currentColor,
                }}
              >
                css
              </p>
              <p
                style={{
                  background: currentColor,
                }}
              >
                jsx
              </p>
              <p
                style={{
                  background: currentColor,
                }}
              >
                express
              </p>
            </div>
            <div className={styles.btn_div}>
              <Link href={live_link} passHref>
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
              <Link href={client_repo} passHref>
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
              <Link href={server_repo} passHref>
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
          <p className={styles.subtitle}>Full-stack</p>
          <h2 className={styles.title}>Bros chat application</h2>
          <StyledRating
            className={styles.rating}
            name="customized-color"
            defaultValue={2}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.1}
            icon={<FaHeartbeat fontSize="inherit" />}
            emptyIcon={<FaRegHeart fontSize="inherit" />}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeProjects;
