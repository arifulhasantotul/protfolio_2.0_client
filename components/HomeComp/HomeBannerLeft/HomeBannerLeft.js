import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Typewriter from "typewriter-effect";
import { useStateContext } from "../../../context/ContextProvider";
import SimpleButton from "../../SimpleButton/SimpleButton";
import styles from "./HomeBannerLeft.module.css";

const HomeBannerLeft = () => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={conditionalMode}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.4,
            },
          },
        }}
      >
        <p className={styles.greetings}>PEACE BE UPON YOU</p>
      </motion.div>
      <h2 className={styles.name}>
        Hi, I&apos;m{" "}
        <span
          style={{
            color: currentColor,
          }}
        >
          MD. ARIFUL HASAN
        </span>
      </h2>
      <div
        style={{
          color: currentColor,
        }}
        className={styles.type_writer}
      >
        <span className={styles.words}>a </span>
        <Typewriter
          options={{
            strings: ["Student", "Programmer", "MERN Developer"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <p className={styles.about}>
        I&apos;m a self-motivated, innovative, task-driven web designer and
        developer with a passion for web designing and development. I always try
        to keep my work simple, clean and effective for other developers and
        users.
      </p>

      <div className={styles.banner_btn}>
        <Link href="/" passHref>
          <span>
            <SimpleButton name="Download Resume" />
          </span>
        </Link>
        <Link href="/contact" passHref>
          <span>
            <SimpleButton name="Contact" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomeBannerLeft;
