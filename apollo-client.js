import { ApolloClient, InMemoryCache } from "@apollo/client";
import { activeURI } from "./services/utils/devVarExport";

const client = new ApolloClient({
  uri: `${activeURI}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    fetchOptions: {
      mode: "no-cors",
    },
  },
});

export default client;
