import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/BlogCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { BsTag } from "react-icons/bs";
import { MdCategory } from "react-icons/md";

const BlogCard = ({ details }) => {
  console.log("🚀 ~ file: BlogCard.jsx:2 ~ BlogCard ~ details:", details);
  const { currentColor, darkTheme } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <>
      <div className={`${conditionalMode} ${styles.card}`}>
        <div className={styles.card_item}>
          <div className={styles.up_div}>
            <div className={styles.card_img}>
              <Image
                className={styles.image}
                src={details?.img}
                alt={details?.name}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <Link href={details?.blog_url} passHref>
              <span
                title={details?.blog_url}
                style={{
                  display: "inline-block",
                  color: currentColor,
                  marginTop: "15px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {" "}
                Read...
              </span>
            </Link>
            <h2 className={styles.card_title}>{details?.name}</h2>
          </div>
          <div className={styles.card_info}>
            <div className={styles.title}>
              {" "}
              <BsTag /> Tags:{" "}
            </div>
            <div className={styles.tag_div}>
              {Array.isArray(details?.tags) &&
                details?.tags.map((item, idx) => (
                  <span
                    style={{
                      color: currentColor,
                      border: `1px solid ${currentColor}`,
                    }}
                    className={styles.tag}
                    key={idx}
                  >
                    {item.name}
                  </span>
                ))}
            </div>
            <br />
            <div className={styles.title}>
              {" "}
              <MdCategory /> Categories:{" "}
            </div>
            <div className={styles.category_div}>
              {Array.isArray(details?.categories) &&
                details.categories.map((item, idx) => (
                  <span
                    style={{
                      color: currentColor,
                      border: `1px solid ${currentColor}`,
                    }}
                    className={styles.tag}
                    key={idx}
                  >
                    {item.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
