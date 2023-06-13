import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { activeURI } from "./services/utils/devVarExport";

export function createApolloClient(accessToken = "") {
  const newClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: `${activeURI}/graphql`,
      headers: {
        authorization: `Bearer ${accessToken}` || "",
      },
    }),
  });

  return newClient;
}

export async function swrFetcher(accessToken, query, variables) {
  const client = createApolloClient(accessToken);
  const { data } = await client.query({ query, variables });
  return data;
}
