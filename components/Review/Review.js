import QuoteIcon from "@/components/CustomIcons/QuoteIcon";
import SimpleButton from "@/components/SimpleButton/SimpleButton";
import SkillPaper from "@/components/SkillPaper/SkillPaper";
import { useStateContext } from "@/context/ContextProvider";
import defaultImage from "@/public/images/def_review.png";
import styles from "@/styles/Review.module.css";
import { Rating } from "@mui/material";
import Image from "next/image";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Review = ({ review }) => {
  const { currentColor, darkTheme } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.review_wrapper}`}>
      <div className={styles.left_side}>
        <div className={styles.figure}>
          <Image
            src={review?.img || defaultImage}
            alt="Reviewer"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <div className={styles.caption}>
          <small
            style={{
              color: currentColor,
              fontSize: "12px",
            }}
          >
            {review?.email}
          </small>
          <h2>{review?.name}</h2>
          <p>{review?.position}</p>
        </div>
      </div>
      <div className={styles.right_side}>
        <div className={styles.btn_wrapper}>
          <QuoteIcon className={styles.quote_icon} />
          <div className={styles.btn}>
            <SimpleButton
              tooltip="Previous review"
              swiperClassName="custom_prev"
            >
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
        </div>
        <div className={styles.review}>
          <div className={styles.upper_div}>
            <div className={styles.head}>
              <h2>{review?.project}</h2>
              <p>{review?.date}</p>
            </div>

            <div className={styles.rating}>
              <SkillPaper tooltip="Rating">
                <Rating name="size-medium" defaultValue={5} />
              </SkillPaper>
            </div>
          </div>
          <hr className={styles.line_break} />
          <div className={styles.lower_div}>
            <p>{review?.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
