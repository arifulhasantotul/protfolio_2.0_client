import PageHeader from "@/components/PageHeader/PageHeader";
import SimpleButton from "@/components/SimpleButton/SimpleButton";
import { useStateContext } from "@/context/ContextProvider";
import {
  getFromStorage,
  saveToLocalStorage,
} from "@/services/utils/temporarySave";
import styles from "@/styles/ProjectForm.module.css";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import Basic from "./Basic";
import Finish from "./Finish";
import Media from "./Media";

const EditProjectComponent = ({
  projectData,
  tags,
  categories,
  clients,
  accessToken,
  user,
}) => {
  const { currentColor, darkTheme } = useStateContext();

  const [toggleState, setToggleState] = useState(1);

  const changeTab = (val) => {
    setToggleState(val);
    saveToLocalStorage("portfolioEditProjectTab", val);
  };

  const basicData = {
    name: projectData?.name || "",
    slug: projectData?.slug || "",
    des: projectData?.des || "",
    rank: projectData?.rank || 0,
    categoriesId: projectData?.categoriesId || [],
    tagsId: projectData?.tagsId || [],
    ratings: projectData?.ratings || 0,
    status: projectData?.status || "Not_Started",
    clientId: projectData?.clientId || "",
  };

  const mediaData = {
    thumb_img: projectData?.thumb_img || "",
    sub_images: projectData?.sub_images || [],
    live_site: projectData?.live_site || "",
    client_repo: projectData?.client_repo || "",
    server_repo: projectData?.server_repo || "",
  };

  useEffect(() => {
    saveToLocalStorage("portfolioEditProjectBasic", basicData);
    saveToLocalStorage("portfolioEditProjectMedia", mediaData);
    const tab = getFromStorage(localStorage, "portfolioEditProjectTab");
    tab ? changeTab(tab) : changeTab(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.project_form}`}>
      <Container maxWidth="lg">
        <PageHeader title="Edit Project" />
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
              <Basic
                nextTab={changeTab}
                projectData={projectData}
                tags={tags}
                categories={categories}
                clients={clients}
                accessToken={accessToken}
                user={user}
              />
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
              <Media
                projectData={projectData}
                nextTab={changeTab}
                accessToken={accessToken}
                user={user}
              />
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
              <Finish
                nextTab={changeTab}
                projectData={projectData}
                tags={tags}
                categories={categories}
                clients={clients}
                accessToken={accessToken}
                user={user}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default EditProjectComponent;
