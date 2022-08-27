import { motion } from "framer-motion";
import React from "react";

const HomePage = () => {
  return (
    <div>
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
        <p>PEACE BE UPON YOU</p>
      </motion.div>
      <h1>
        Hi, I&apos;m <span>MD. ARIFUL HASAN</span>
      </h1>
      <p>
        I&apos;m a self-motivated, innovative, task-driven web designer and
        developer with a passion for web designing and development. I always try
        to keep my work simple, clean and effective for other developers and
        users.
      </p>
    </div>
  );
};

export default HomePage;
