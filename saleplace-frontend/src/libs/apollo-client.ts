import { InMemoryCache, ApolloClient, split } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { SERVER_URL, WEBSOKET_URL } from "./constants/url.constants";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const httpLink = createUploadLink({
  uri: SERVER_URL,
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

export const wsClient = createClient({
  url: WEBSOKET_URL,
  lazy: true,
  retryAttempts: Infinity,
  shouldRetry: () => true,
});

const wsLink = new GraphQLWsLink(wsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const restartWebsocket = async () => {
  wsClient.dispose()
  await client.clearStore()
  await client.stop()
}

export const restartApollo = async () => {
  wsClient.dispose()
  await client.clearStore()
  await client.reFetchObservableQueries()
}