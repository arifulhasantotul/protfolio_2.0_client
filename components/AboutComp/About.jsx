import CircularProgressBar from "@/components/CustomCircularProgressBar/CircularProgressBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/About.module.css";
import { Container } from "@mui/material";

const About = ({ accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.about_page} ${conditionalMode}`}>
      <>
        <Container maxWidth="xl" className={styles.p0}>
          <PageHeader title="All About" />
          <div className={styles.card_wrapper}>
            <CircularProgressBar />
          </div>
        </Container>
      </>
    </div>
  );
};

export default About;
