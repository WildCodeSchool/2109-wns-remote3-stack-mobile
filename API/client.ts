import { ApolloClient, InMemoryCache } from '@apollo/client';

// Initialize Apollo Client
export const client = new ApolloClient({
    uri: 'localhost:4000/graphql',
    cache: new InMemoryCache()
});
