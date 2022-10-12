import SimpleButton from "@/components/SimpleButton/SimpleButton";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/ProjectForm.module.css";
import { Container } from "@mui/material";
import { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import Basic from "./Basic";
import Finish from "./Finish";
import Media from "./Media";

const AddProjectComponent = () => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  const [toggleState, setToggleState] = useState(1);

  const changeTab = (val) => {
    setToggleState(val);
  };

  return (
    <div className={`${conditionalMode} ${styles.project_form}`}>
      <Container maxWidth="xl">
        <div className={styles.block_tabs}>
          <SimpleButton
            className={
              toggleState === 1
                ? `${styles.tabs} ${styles.active_tabs}`
                : styles.tabs
            }
            onClick={() => changeTab(1)}
          >
            Basic
          </SimpleButton>

          <div
            className={styles.tab_link}
            style={{
              backgroundColor: toggleState >= 2 ? currentColor : null,
            }}
          >
            {toggleState >= 2 && (
              <BsCheck2Circle className={styles.done_icon} />
            )}
          </div>

          <SimpleButton
            className={
              toggleState === 2
                ? `${styles.tabs} ${styles.active_tabs}`
                : styles.tabs
            }
            onClick={() => changeTab(2)}
          >
            Media
          </SimpleButton>

          <span
            className={styles.tab_link}
            style={{
              backgroundColor: toggleState >= 3 ? currentColor : null,
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
            onClick={() => changeTab(3)}
          >
            Finish
          </SimpleButton>
        </div>

        <div className={styles.block_content}>
          {toggleState === 1 && (
            <div
              className={
                toggleState === 1
                  ? `${styles.content} ${styles.active_content}`
                  : styles.content
              }
            >
              <Basic sendData={changeTab} />
            </div>
          )}
          {toggleState === 2 && (
            <div
              className={
                toggleState === 2
                  ? `${styles.content} ${styles.active_content}`
                  : styles.content
              }
            >
              <Media sendData={changeTab} />
            </div>
          )}
          {toggleState === 3 && (
            <div
              className={
                toggleState === 3
                  ? `${styles.content} ${styles.active_content}`
                  : styles.content
              }
            >
              <Finish sendData={changeTab} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AddProjectComponent;
