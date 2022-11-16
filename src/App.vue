<template>
  <div>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <p v-else v-for="blog in result.jareer_getAllBlogs.data" :key="blog.id">
      {{ blog.title }}
    </p>
    <div></div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { BLOGS_LIST } from './graphql/listBlogs';

export default {
  name: 'App',
  setup() {
    const { result, loading, error } = useQuery(BLOGS_LIST);
    return {
      result,
      loading,
      error,
    };
  },
};
</script>

<style scoped></style>
