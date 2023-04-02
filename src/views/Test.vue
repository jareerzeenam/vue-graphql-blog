<script setup>
import { computed, onMounted, ref } from 'vue';

import { useQuery } from '@vue/apollo-composable';
// GraphQL query
import { BLOGS_LIST } from '../graphql/listBlogs';

// create ref for observer
const observer = ref(null);

// create ref for target element for observer to observe
const target = ref(null);

const PARAMS = {
  paginate: {
    limit: 10,
    offset: 1,
  },
  sort: {
    fieldName: 'createdAt',
    order: 'ASC',
  },
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
} = useQuery(BLOGS_LIST, PARAMS);

// computed value to know if there are more pages after the last result
const hasNextPage = computed(() => {
  return (
    result.value?.jareer_getAllBlogs.total >
    result.value?.jareer_getAllBlogs.data.length
  );
});

// function to load more content and update query result
const loadMore = () => {
  const resultLength = result.value.jareer_getAllBlogs.data.length;
  // fetchMore function from `useQuery` to fetch more content with `updateQuery`
  fetchMore({
    // update `after` variable with `endCursor` from previous result
    variables: {
      paginate: {
        limit: resultLength,
        offset: 2,
      },
      sort: {
        fieldName: 'createdAt',
        order: 'ASC',
      },
    },

    // pass previous query result and the new results to `updateQuery`
    updateQuery: (previousQueryResult, { fetchMoreResult }) => {
      // define edges and pageInfo from new results
      const newEdges = fetchMoreResult.jareer_getAllBlogs.data;

      // if newEdges actually have items,
      return newEdges.length
        ? // return a reconstruction of the query result with updated values
          {
            // spread the value of the previous result
            ...previousQueryResult.jareer_getAllBlogs,
            jareer_getAllBlogs: {
              // spread the value of the previous `jareer_getAllBlogs` data into this object
              ...previousQueryResult.jareer_getAllBlogs,

              // concatenate edges
              data: [
                ...previousQueryResult.jareer_getAllBlogs.data,
                ...newEdges,
              ],
            },
          }
        : // else, return the previous result
          previousQueryResult;
    },
  });
};

onMounted(() => {
  // options for observer
  const options = {
    threshold: 1.0,
  };

  // define obseerver
  observer.value = new IntersectionObserver(([entry]) => {
    // if the target is visible
    if (entry && entry.isIntersecting) {
      // load more content
      loadMore();
    }
  }, options);

  // define the target to observe
  observer.value.observe(target.value);
});
</script>

<template>
  <main class="text-white text-lg">
    {{ hasNextPage }}
    <ul class="py-10">
      <p v-if="error">oops</p>
      <li
        v-else
        v-for="blog in result?.jareer_getAllBlogs.data"
        :key="blog.id"
        class="text-4xl p-4"
      >
        <p>{{ blog.id }}</p>
        <p>{{ blog.title }}</p>
      </li>
    </ul>

    <!-- target button, load more manually when clicked -->
    <button ref="target" @click="loadMore" class="cta">
      <span v-if="loading">Loading...</span>
      <span v-else-if="!hasNextPage">That's a wrap!</span>
      <span v-else>More</span>
    </button>
  </main>
</template>

<style scoped>
button {
  cursor: pointer;
}

.cta {
  padding: 0.5rem 1rem;
  background: var(--vt-c-white-soft);
  color: var(--color-background-soft);
  border: none;
  border-radius: 0.5rem;
}
</style>
