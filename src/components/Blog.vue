<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { SHOW_BLOG } from '../graphql/showBlog';

const props = defineProps(['id']);

const PARAMS = {
  jareerShowBlogId: props.id,
};

// destructure
const {
  // result of the query
  result,

  // loading state of the query
  loading,

  // query errors, if any
  error,

  // method to fetch more
  fetchMore,

  // access to query variables
  variables,
} = useQuery(SHOW_BLOG, PARAMS);

console.log('RESULT ::: ', result);
</script>

<template>
  <div>
    <p>Lorem ipsum dolor sit amet. {{ id }}</p>
    <h1 class="text-3xl font-bold text-white">
      {{ result?.jareer_showBlog.title }}
    </h1>
    <p>{{ result?.jareer_showBlog.description }}</p>
  </div>
</template>
