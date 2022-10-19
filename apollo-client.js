import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  // uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
  headers: {
    fetchOptions: {
      mode: "no-cors",
    },
  },
});

export default client;
