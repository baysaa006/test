import { useMemo } from 'react'
import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { getAccessToken } from '../contexts/auth.context'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

const urig = 'https://92mzlybwuf.execute-api.ap-east-1.amazonaws.com/prod/menu/graphql'

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getAccessToken();
    operation.setContext({
      headers: {
        Authorization: token || null,
      },
    });
    // Add onto payload for WebSocket authentication
    (operation as any & { token: string | undefined }).authToken = token;
  
    return forward(operation);
  });

  const httpLink = new HttpLink({
    fetch,
    uri: urig,
  });

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
            },
      }
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = createApolloClient()
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated 
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function addApolloState(client: { cache: { extract: () => any } }, pageProps: { props: { [x: string]: any } }) {
    if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: { [x: string]: any }) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}