import { useStateContext } from "@/context/ContextProvider";
import defaultImage from "@/public/images/def_review.png";
import styles from "@/styles/Review.module.css";
import Image from "next/image";
import QuoteIcon from "../CustomIcons/QuoteIcon";

const Review = () => {
  const { currentColor, darkTheme } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${conditionalMode} ${styles.review_wrapper}`}>
      <div className={styles.left_side}>
        <div className={styles.figure}>
          <Image
            src={defaultImage}
            alt="Reviewer"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <div className={styles.caption}>
          <h2>Davei Luace</h2>
          <p>Chief Operating Manager</p>
        </div>
      </div>
      <div className={styles.right_side}>
        <div className={styles.btn_wrapper}>
          <div className={styles.quote}>
            <QuoteIcon className={styles.quote_icon} />
          </div>
        </div>
        <div className={styles.review}></div>
      </div>
    </div>
  );
};

export default Review;
