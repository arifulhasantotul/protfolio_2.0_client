import DashOverviewComponent from "@/components/DashboardComp/OverviewComp/DashOverviewComponent";
import { ALL_CATEGORIES_NAME } from "@/services/graphql/queries";
import { extractJWT, getCookie } from "@/services/utils/cookieExtract";
import client from "apollo-client";
import Head from "next/head";

export default function Dashboard({ categories, accessToken }) {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Portfolio - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DashOverviewComponent accessToken={accessToken} />
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { cookie } = ctx.req.headers;
  let accessToken = null;
  try {
    const token = getCookie("portfolio_2_0", cookie);
    const decodedToken = extractJWT(token);
    accessToken = decodedToken;
  } catch (err) {
    accessToken = null;
  }
  // setting private route
  if (!accessToken) {
    ctx.res.setHeader("Set-Cookie", "portfolio_2_0=; path=/; max-age=0");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { data } = await client.query({
    query: ALL_CATEGORIES_NAME,
  });
  return {
    props: {
      categories: data?.listCategory || [],
      accessToken: accessToken,
    },
  };
}
