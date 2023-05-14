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
    <!-- Show preloader when loading is true -->
    <div v-if="loading" class="text-center">
      <h1>Loading...</h1>
    </div>

    <div class="text-center" v-if="!error">
      <!-- <pre>{{ result }}</pre> -->
      <h1 class="text-8xl font-bold underline">
        {{ result?.jareer_showBlog.title }}
      </h1>
      <div class="mt-5">
        <span v-html="result?.jareer_showBlog.description"></span>
      </div>

      <div class="mt-10">
        <router-link
          to="/blogs"
          class="bg-blue-800 text-lg p-2 rounded"
          >Back</router-link
        >
      </div>
    </div>

    <div class="text-center" v-else>
      <h1 class="text-4xl text-red-400">{{ error.message }}</h1>
    </div>
  </div>
</template>

<style>
.custom-p-class {
  margin-top: 3rem;
  text-align: justify;
  font-weight: 400;
}

span > p {
  @apply custom-p-class;
}
</style>
