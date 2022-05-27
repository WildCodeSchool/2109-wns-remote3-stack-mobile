import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import Constants from 'expo-constants';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import { getMainDefinition } from '@apollo/client/utilities';

const API_KEY = Constants?.manifest?.extra?.apiKey;
const WS_URI = Constants?.manifest?.extra?.wsUri;

const httpLink = createHttpLink({
  uri: API_KEY,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URI,
  })
);

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('token');
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([authLink, httpLink])
);

// Initialize Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
