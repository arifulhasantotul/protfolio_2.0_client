import { useStateContext } from "@/context/ContextProvider";
import Link from "next/link";
import routes from "../../../routes/routes";
import styles from "@/styles/LowerNavbar.module.css";

const LowerNavbar = () => {
  const { pageURL, currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.nav_sec}`}>
      <div className={styles.nav_wrapper}>
        <div className={styles.nav_links}>
          {routes.map((path, idx) => (
            <Link key={idx} href={path.to}>
              <span
                className={
                  pageURL === path.to ? styles.activeLink : styles.link
                }
                title={`Go to: ${path.to}`}
              >
                <span title={path.name} className={styles.link_icon}>
                  {path.icon}
                </span>
                <span
                  className={`${styles.link_name}`}
                  style={{
                    color: currentColor,
                  }}
                >
                  {path.name}
                </span>
                <div
                  className={styles.indicator}
                  style={{
                    background: currentColor,
                  }}
                ></div>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LowerNavbar;
