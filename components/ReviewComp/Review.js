import QuoteIcon from "@/components/CustomIcons/QuoteIcon";
import MarkdownViewer from "@/components/Editor/MarkdownViewer";
import SimpleButton from "@/components/SimpleButton/SimpleButton";
import SkillPaper from "@/components/SkillPaper/SkillPaper";
import { useStateContext } from "@/context/ContextProvider";
import defaultImage from "@/public/images/def_review.png";
import { htmlToMarkdown } from "@/services/utils/htmlMarkdown";
import { monthDayYear } from "@/services/utils/monthName";
import styles from "@/styles/Review.module.css";
import { Rating } from "@mui/material";
import Image from "next/image";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Review = ({ review }) => {
  const { currentColor, darkTheme, screenSize } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.review_wrapper}`}>
      {screenSize > 800 ? (
        <div className={styles.left_side}>
          <div className={styles.figure}>
            <Image
              src={review?.reviewer?.avatar || defaultImage}
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
              {review?.reviewer?.email}
            </small>
            <h2>{review?.reviewer?.name}</h2>
            <p>{review?.reviewer?.designation || "Not Found"}</p>
          </div>
        </div>
      ) : (
        <div className={styles.left_side_sm}>
          <div className={styles.figure_sm}>
            <Image
              src={review?.img || defaultImage}
              alt="Reviewer"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <div className={styles.caption_sm}>
            <small
              style={{
                color: currentColor,
                fontSize: "12px",
              }}
            >
              {review?.reviewer?.email}
            </small>
            <h2>{review?.reviewer?.name}</h2>
            <p>{review?.reviewer?.designation || "Not Found"}</p>
          </div>
        </div>
      )}
      <div className={styles.right_side}>
        <div className={styles.btn_wrapper}>
          <QuoteIcon className={styles.quote_icon} />
          <div className={styles.btn}>
            <SimpleButton
              type="button"
              tooltip="Previous review"
              swiperClassName="custom_prev"
            >
              {/* This className is important for swiper button */}
              <AiOutlineArrowLeft className={styles.arrow_icon} />{" "}
            </SimpleButton>
            <SimpleButton
              type="button"
              tooltip="Next review"
              swiperClassName="custom_next"
            >
              {/* This className is important for swiper button */}
              <AiOutlineArrowRight className={styles.arrow_icon} />{" "}
            </SimpleButton>
          </div>
        </div>
        <div className={styles.review}>
          <div className={styles.upper_div}>
            <div className={styles.head}>
              <h2>{review?.title}</h2>
              <p>
                {monthDayYear(review?.projectStartDate)} -{" "}
                {monthDayYear(review?.projectEndDate)}
              </p>
            </div>

            <div className={styles.rating_div}>
              <SkillPaper mt={0} mr={0} tooltip="Rating">
                {screenSize > 400 ? (
                  <Rating
                    name="size-medium"
                    defaultValue={0}
                    value={review?.rating}
                    precision={0.1}
                    readOnly
                  />
                ) : (
                  <Rating
                    name="size-small"
                    defaultValue={0}
                    value={review?.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                )}
              </SkillPaper>
            </div>
          </div>
          <hr className={styles.line_break} />
          <div className={styles.lower_div}>
            <MarkdownViewer richText={htmlToMarkdown(review?.comment)} />
            <p>{review?.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
