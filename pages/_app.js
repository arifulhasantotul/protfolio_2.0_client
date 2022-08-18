import "swiper/css/bundle";
import Layout from "../components/Layout/Layout";
import ContextProvider from "../context/ContextProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // context api wrapper
    <ContextProvider>
      {/* page layout  */}
      <Layout>
        {/* page components */}
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
