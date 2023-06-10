import HomeBannerLeft from "@/components/HomeComp/HomeBannerLeft/HomeBannerLeft";
import HomeBannerRight from "@/components/HomeComp/HomeBannerRight/HomeBannerRight";
import HomeProjects from "@/components/HomeComp/HomeProjects/HomeProjects";
import HomeSkills from "@/components/HomeComp/HomeSkills/HomeSkills";
import PageHeader from "@/components/PageHeader/PageHeader";
import AddReview from "@/components/ReviewComp/AddReview";
import SimpleButton from "@/components/SimpleButton/SimpleButton";
import ReviewSlider from "@/components/Slider/ReviewSlider";
import { useStateContext } from "@/context/ContextProvider";
import { ALL_REVIEW } from "@/services/graphql/queries";
import styles from "@/styles/HomePage.module.css";
import { Container, Grid } from "@mui/material";
import client from "apollo-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fakeData } from "../../test-data/sliderData";

export const getAllReview = async () => {
  const { data } = await client.query({
    query: ALL_REVIEW,
  });
  return data.listReview;
};

const HomePage = ({ projects, accessToken }) => {
  const { darkTheme } = useStateContext();
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  // const [addedReview, setAddedReview] = useState(false);
  const [allReview, setAllReview] = useState([]);

  useEffect(() => {
    getAllReview()
      .then((res) => setAllReview(res))
      .catch((err) => console.log(err));
  }, []);

  const handleReviewFromShow = () => {
    if (accessToken) {
      setShowForm(!showForm);
      window.scrollTo(0, 1200);
    } else {
      localStorage.removeItem("portfolioIdToken");
      router.push("/login");
    }
  };
  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${styles.home_page} ${conditionalMode}`}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <HomeBannerLeft />
          </Grid>
          <Grid item xs={12} md={6}>
            <HomeBannerRight />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HomeSkills />
          </Grid>
        </Grid>

        <hr className={styles.break_line} />
        <PageHeader title="Projects" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HomeProjects projects={projects} />
          </Grid>
        </Grid>

        <hr className={styles.break_line} />
        <PageHeader title="Testimonial" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReviewSlider
              allReview={allReview}
              // addedReview={addedReview}
              data={fakeData}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SimpleButton
              tooltip="Click to open review form. But you need to login first."
              type="button"
              onClick={handleReviewFromShow}
            >
              {showForm ? "Close" : "Add"} Review
            </SimpleButton>
          </Grid>
          <Grid item xs={12}>
            {accessToken && showForm ? (
              <AddReview
                // setAddedReview={setAddedReview}
                allReview={allReview}
                setAllReview={setAllReview}
                accessToken={accessToken}
              />
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
