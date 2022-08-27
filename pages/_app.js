import { AnimatePresence, motion } from "framer-motion";
import "swiper/css/bundle";
import Layout from "../components/Layout/Layout";
import ContextProvider from "../context/ContextProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  return (
    // context api wrapper
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
  );
}

export default MyApp;
