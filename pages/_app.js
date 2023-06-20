import PageLoading from "@/components/PageLoading/PageLoading";
import ContextProvider from "@/context/ContextProvider";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient, swrFetcher } from "apolloClient";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import "swiper/css/bundle";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { SWRConfig } from "swr";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps, router }) {
  const [cookies] = useCookies(["portfolio_2_0"]);
  const accessToken = cookies["portfolio_2_0"];
  const nextRouter = useRouter();
  const routerPath = nextRouter.pathname;
  const [ssrRendering, setSsrRendering] = useState(false);

  const newApolloClient = createApolloClient(accessToken);

  // this useEffect is for the page transition && page loading
  useEffect(() => {
    const handleStart = () => setSsrRendering(true);
    const handleComplete = () => setSsrRendering(false);

    nextRouter.events.on("routeChangeStart", handleStart);
    nextRouter.events.on("routeChangeComplete", handleComplete);
    nextRouter.events.on("routeChangeError", handleComplete);

    return () => {
      nextRouter.events.off("routeChangeStart", handleStart);
      nextRouter.events.off("routeChangeComplete", handleComplete);
      nextRouter.events.off("routeChangeError", handleComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerPath]);
  return (
    <>
      {/*Apollo/graphql wrapper */}
      {!ssrRendering ? (
        <SWRConfig
          value={{
            fetcher: swrFetcher,
          }}
        >
          <ApolloProvider client={newApolloClient}>
            {/* context api wrapper */}
            <CookiesProvider>
              <ContextProvider>
                {/* page layout  */}
                <Layout>
                  {/* page transition */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={router.route}
                      initial="pageInitial"
                      animate="pageAnimate"
                      exit="exitAnimation"
                      transition={{
                        duration: 0.75,
                      }}
                      variants={{
                        pageInitial: {
                          opacity: 0,
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                        },
                        pageAnimate: {
                          scale: 1,
                          opacity: 1,
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                        },
                        exitAnimation: {
                          clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
                        },
                      }}
                    >
                      {/* page components */}
                      <Component {...pageProps} />
                    </motion.div>
                  </AnimatePresence>
                </Layout>
              </ContextProvider>
            </CookiesProvider>
          </ApolloProvider>
        </SWRConfig>
      ) : (
        <ContextProvider>
          <PageLoading />
        </ContextProvider>
      )}
    </>
  );
}

export default MyApp;
