import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: 'http://192.168.0.30:4000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://192.168.0.30:4000/graphql',
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
  authLink.concat(httpLink)
);

// Initialize Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
