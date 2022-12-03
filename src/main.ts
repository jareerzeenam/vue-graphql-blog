import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import './style.css';
import App from './App.vue';
import { router } from './router';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:5000/graphql',
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.mount('#app');
