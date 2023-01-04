import ContextProvider from "@/context/ContextProvider";
import { activeURI } from "@/services/utils/devVarExport";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import "swiper/css/bundle";
import Layout from "../components/Layout/Layout";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps, router }) {
  const client = new ApolloClient({
    uri: `${activeURI}/graphql`,
    cache: new InMemoryCache(),
  });
  return (
    <>
      {/*Apollo/graphql wrapper */}
      <ApolloProvider client={client}>
        {/* context api wrapper */}
        <ContextProvider>
          {/* page layout  */}
          <CookiesProvider>
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
          </CookiesProvider>
        </ContextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
