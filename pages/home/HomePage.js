import DataNotFound from "@/components/FetchingResult/DataNotFound";
import HomeBannerLeft from "@/components/HomeComp/HomeBannerLeft/HomeBannerLeft";
import HomeBannerRight from "@/components/HomeComp/HomeBannerRight/HomeBannerRight";
import HomeBlogs from "@/components/HomeComp/HomeBlogs/HomeBlogs";
import HomeProjects from "@/components/HomeComp/HomeProjects/HomeProjects";
import HomeSkills from "@/components/HomeComp/HomeSkills/HomeSkills";
import PageHeader from "@/components/PageHeader/PageHeader";
import AddReview from "@/components/ReviewComp/AddReview";
import SimpleButton from "@/components/SimpleButton/SimpleButton";
import ReviewSlider from "@/components/Slider/ReviewSlider";
import { useStateContext } from "@/context/ContextProvider";
import { ALL_REVIEWS } from "@/services/graphql/queries";
import { validArray } from "@/services/utils/common";
import styles from "@/styles/HomePage.module.css";
import { Container, Grid } from "@mui/material";
import client from "apollo-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fakeData } from "../../test-data/sliderData";
import useSWR from "swr";

export const getAllReview = async () => {
  const { data } = await client.query({
    query: ALL_REVIEWS,
  });
  return data.listReview;
};

const HomePage = ({ projects, blogs, accessToken }) => {
  const { darkTheme, userIPRef } = useStateContext();
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  // const [addedReview, setAddedReview] = useState(false);
  const [allReview, setAllReview] = useState([]);

  const httpFetcher = (url) => fetch(url).then((res) => res.json());

  const {
    data,
    isLoading: isIPLoading,
    error,
  } = useSWR("https://api.ipify.org?format=json", httpFetcher);
  console.log(
    "🚀 ~ file: ThemeSettings.jsx:47 ~ Homepage ~ isIPLoading:",
    userIPRef.current
  );

  useEffect(() => {
    userIPRef.current = data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isIPLoading]);

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
        <PageHeader title="Blogs" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HomeBlogs blogs={blogs} />
          </Grid>
        </Grid>

        <hr className={styles.break_line} />
        <PageHeader title="Testimonial" />
        <Grid container spacing={2}>
          {validArray(allReview) ? (
            <Grid item xs={12}>
              <ReviewSlider
                allReview={allReview}
                // addedReview={addedReview}
                data={fakeData}
              />
            </Grid>
          ) : (
            <DataNotFound title="Review not found!" />
          )}
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
