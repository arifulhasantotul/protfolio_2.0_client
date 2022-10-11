import SimpleButton from "@/components/SimpleButton/SimpleButton";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/ProjectForm.module.css";
import { Container } from "@mui/material";
import { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";

const AddProjectComponent = () => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  const [toggleState, setToggleState] = useState(1);

  const getData = (val) => {
    setToggleState(val);
  };

  return (
    <div className={`${styles.dash_page} ${conditionalMode}`}>
      <Container maxWidth="xl">
        <div className={styles.block_tabs}>
          <SimpleButton
            className={
              toggleState === 1
                ? `${styles.tabs} ${styles.active_tabs}`
                : styles.tabs
            }
          >
            Basic
          </SimpleButton>

          <span
            className={styles.tab_link}
            style={{
              backgroundColor: toggleState >= 2 ? currentColor : "",
            }}
          >
            {toggleState >= 2 && (
              <BsCheck2Circle className={styles.done_icon} />
            )}
          </span>

          <SimpleButton
            className={
              toggleState === 2
                ? `${styles.tabs} ${styles.active_tabs}`
                : styles.tabs
            }
          >
            Media
          </SimpleButton>

          <span
            className={styles.tab_link}
            style={{
              backgroundColor: toggleState >= 3 ? currentColor : "",
            }}
          >
            {toggleState >= 3 && (
              <BsCheck2Circle className={styles.done_icon} />
            )}
          </span>

          <SimpleButton
            className={
              toggleState === 3
                ? `${styles.tabs} ${styles.active_tabs}`
                : styles.tabs
            }
          >
            Finish
          </SimpleButton>
        </div>

        <div className={styles.block_fields}></div>
      </Container>
    </div>
  );
};

export default AddProjectComponent;
