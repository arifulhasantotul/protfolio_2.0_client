import ContextProvider from "@/context/ContextProvider";
import { activeURI } from "@/services/utils/devVarExport";
import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import { CookiesProvider, useCookies } from "react-cookie";
import "swiper/css/bundle";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps, router }) {
  const [cookies] = useCookies(["portfolio_2_0"]);
  const accessToken = cookies["portfolio_2_0"];
  const httpLink = new HttpLink({ uri: `${activeURI}/graphql` });
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}` || "",
      },
    }));
    return forward(operation);
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
  return (
    <>
      {/*Apollo/graphql wrapper */}
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
    </>
  );
}

export default MyApp;
