import CircularProgressBar from "@/components/CustomCircularProgressBar/CircularProgressBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/About.module.css";
import { Container } from "@mui/material";
import { useState } from "react";
import SimpleButton from "../SimpleButton/SimpleButton";
import AboutSkillSlider from "../Slider/AboutSkillSlider";
import Education from "./Education";
import Experience from "./Experience";
import { aboutData } from "./aboutData";

const About = ({ accessToken }) => {
  const { screenSize, currentColor, darkTheme } = useStateContext();

  const [tabValue, setTabValue] = useState(1);

  const changeTab = (val) => {
    setTabValue(val);
  };

  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <>
      <div className={`${styles.about_page} ${conditionalMode}`}>
        <Container maxWidth="xl" className={styles.p0}>
          <PageHeader title="CODING SKILLS" />
          {screenSize > 500 ? (
            <div className={styles.card_wrapper}>
              {aboutData.map((item, index) => (
                <CircularProgressBar
                  key={index}
                  title={item.title}
                  percentage={item?.percentage}
                  color={item?.color}
                />
              ))}
            </div>
          ) : (
            <AboutSkillSlider data={aboutData} />
          )}

          <PageHeader title="Resume" />
          <div className={styles.block_tabs}>
            <SimpleButton
              className={
                tabValue === 1
                  ? `${styles.tabs} ${styles.active_tabs}`
                  : styles.tabs
              }
              onClick={() => changeTab(1)}
            >
              Education
            </SimpleButton>

            <SimpleButton
              className={
                tabValue === 2
                  ? `${styles.tabs} ${styles.active_tabs}`
                  : styles.tabs
              }
              onClick={() => changeTab(2)}
            >
              Experience
            </SimpleButton>
          </div>

          <>
            {tabValue === 1 && <Education />}
            {tabValue === 2 && <Experience />}
          </>
        </Container>
      </div>
    </>
  );
};

export default About;
