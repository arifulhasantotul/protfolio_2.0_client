import { ApolloClient, InMemoryCache } from "@apollo/client";
import { activeURI } from "./services/utils/devVarExport";

const client = new ApolloClient({
  uri: `${activeURI}/graphql`,
  // uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
  headers: {
    fetchOptions: {
      mode: "no-cors",
    },
  },
});

export default client;

// https://www.youtube.com/watch?v=A3WwR_TxNyQ&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_&index=16
// 17:07
