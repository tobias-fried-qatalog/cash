import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";

export const BASE_URL = "http://localhost:9000";

export const cache = new InMemoryCache();
await persistCache({
  cache,
  storage: localStorage,
});

export const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache,
});
