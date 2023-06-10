import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/DashOverviewComponent.module.css";
import { Container } from "@mui/material";

const DashOverviewComponent = () => {
  const { currentColor, darkTheme } = useStateContext();

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.overview_wrapper}`}>
      <Container maxWidth="lg">
        <PageHeader title="Overview" />
      </Container>
    </div>
  );
};

export default DashOverviewComponent;
