import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/DashboardPage.module.css";
import { Container } from "@mui/material";

const DashboardPage = () => {
  const {darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${styles.dash_page} ${conditionalMode}`}>
      <Container maxWidth="xl"></Container>
    </div>
  );
};

export default DashboardPage;
