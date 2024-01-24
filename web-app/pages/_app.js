import '../styles/globals.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import { createUploadLink } from 'apollo-upload-client';


const httpLink = createUploadLink({
  uri: 'https://gaione-server.one/koalabo/graphql'
  // uri: 'http://localhost:4000/graphql',
});


const client = new ApolloClient({
  link: httpLink,
  //uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {

  return <>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </>
}

export default MyApp
