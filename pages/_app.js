import PageLoading from "@/components/PageLoading/PageLoading";
import ContextProvider from "@/context/ContextProvider";
import { activeURI } from "@/services/utils/devVarExport";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { AnimatePresence, motion } from "framer-motion";
import { headers } from "next.config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import "swiper/css/bundle";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps, router }) {
  const [cookies] = useCookies(["portfolio_2_0"]);
  const accessToken = cookies["portfolio_2_0"];
  const nextRouter = useRouter();
  const [ssrRendering, setSsrRendering] = useState(false);
  // const httpLink = new HttpLink({ uri: `${activeURI}/graphql` });
  // const authMiddleware = new ApolloLink((operation, forward) => {
  //   operation.setContext(({ headers = {} }) => ({
  //     headers: {
  //       ...headers,
  //       authorization: `Bearer ${accessToken}` || "",
  //     },
  //   }));
  //   return forward(operation);
  // });
  // const client = new ApolloClient({
  //   cache: new InMemoryCache(),
  //   link: concat(authMiddleware, httpLink),
  // });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: `${activeURI}/graphql`,
      // credentials: "include",
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}` || "",
      },
    }),
  });

  // this useEffect is for the page transition && page loading
  useEffect(() => {
    const handleStart = (url) =>
      url !== nextRouter.asPath ? setSsrRendering(true) : null;
    const handleComplete = (url) =>
      url === nextRouter.asPath ? setSsrRendering(false) : null;

    nextRouter.events.on("routeChangeStart", handleStart);
    nextRouter.events.on("routeChangeComplete", handleComplete);
    nextRouter.events.on("routeChangeError", handleComplete);

    return () => {
      nextRouter.events.off("routeChangeStart", handleStart);
      nextRouter.events.off("routeChangeComplete", handleComplete);
      nextRouter.events.off("routeChangeError", handleComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextRouter.asPath]);
  return (
    <>
      {/*Apollo/graphql wrapper */}
      {!ssrRendering ? (
        <ApolloProvider client={client}>
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
      ) : (
        <ContextProvider>
          <PageLoading />
        </ContextProvider>
      )}
    </>
  );
}

export default MyApp;
