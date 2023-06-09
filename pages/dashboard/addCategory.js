import AddCategoryComponent from "@/components/DashboardComp/CategoryComp/AddCategoryComponent";
import { getCookie } from "@/services/utils/cookieExtract";
import Head from "next/head";

export default function AddCategoryPage({ accessToken }) {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Portfolio - Add Category</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AddCategoryComponent accessToken={accessToken} />
      </main>
    </div>
  );
}

// to get new added categories and tags from the database we should use getServerSideProps
export async function getServerSideProps({ req, res }) {
  const { cookie } = req.headers;
  const accessToken = getCookie("portfolio_2_0", cookie);

  // setting private route
  if (!accessToken) {
    res.setHeader("Set-Cookie", "portfolio_2_0=; path=/; max-age=0");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      accessToken: accessToken || "",
    },
  };
}
