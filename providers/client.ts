import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { AuthOptions, AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { getAccessToken } from '../contexts/auth.context';

const url = `https://${process.env.url}.qrms.mn/graphql`;

const region = `${process.env.region}`;

const auth: AuthOptions = {
  type: AUTH_TYPE.AWS_LAMBDA,
  token: () => getAccessToken(),
};

const httpLink = createHttpLink({ uri: url });

const authLink = createAuthLink({ url, region, auth });

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((element: any, index: any) => {
      switch (element.errorType) {
        case 'UnauthorizedException': {
          localStorage.clear();
          window.location.reload();
          return forward(operation);
        }
        case 'CE0004': {
          window.location.reload();
          return forward(operation);
        }
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLinkWithMiddleware = authLink.concat(errorLink);

const link = ApolloLink.from([
  httpLinkWithMiddleware,
  createSubscriptionHandshakeLink({ url: url + '/realtime', region, auth }, httpLink),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
