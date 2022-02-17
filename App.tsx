import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './API/client'
import { Layout } from './screens/layout';


export default function App() {
    return (
      <ApolloProvider client={client}>
        <Layout />
      </ApolloProvider>
    );
}
