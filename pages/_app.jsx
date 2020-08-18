import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache()
  })

  return <ApolloProvider client={client}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ApolloProvider>
}

export default MyApp
