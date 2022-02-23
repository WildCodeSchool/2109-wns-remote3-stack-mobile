import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { removeTypenameFromMutationLink } from 'apollo-remove-typename-mutation-link';

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });
const link = from([removeTypenameFromMutationLink, httpLink]);
// Initialize Apollo Client
const client = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache(),
  link,
});

export default client;
