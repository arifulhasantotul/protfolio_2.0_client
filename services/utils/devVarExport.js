export const activeURI =
  process.env.NEXT_PUBLIC_RUNNING === "dev"
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_PROD_SERVER;
