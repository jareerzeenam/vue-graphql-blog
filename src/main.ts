import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import App from './App.vue';
import { router } from './router';

import './style.css';
import 'flowbite';

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
});

// Set up an authorization header using the token
const authLink = setContext((_, { headers }) => {
  // TODO :: implement login functionality and on token response store it to the local storage and get below token from local storage
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyNDdiMGRlZWI5NDBiZjRlZWVjMDI3IiwiZW1haWwiOiJqYXJlZXJAZW1haWwuY29tIiwiaWF0IjoxNjgwNjM0NDY0LCJleHAiOjE2ODA2NDE2NjR9.aujOp3SW9i0K_wrmWGSeNckkRaMRUR29z749J0QZvgc';
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink.concat(httpLink), errorLink]),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.mount('#app');
