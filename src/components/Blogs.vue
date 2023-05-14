<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useQuery } from '@vue/apollo-composable';
// GraphQL query
import { BLOGS_LIST } from '../graphql/listBlogs';

// create ref for observer
const observer = ref(null);

// create ref for target element for observer to observe
const target = ref(null);

const sortOrder = ref('ASC');
const limitVal = ref(16);

const PARAMS = {
  paginate: {
    limit: limitVal,
    offset: 1,
  },
  sort: {
    fieldName: 'createdAt',
    order: sortOrder,
  },
};

const updateSortColumn = () => {
  if (sortOrder.value === 'DESC') {
    sortOrder.value = 'ASC';
  } else {
    sortOrder.value = 'DESC';
  }
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
  const resultLength = result?.value?.jareer_getAllBlogs.data.length;

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

  // define observer
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
  <div>
    <p v-if="error">Something went wrong...</p>
    <div v-else>
      <button
        class="font-bold p-2 mb-2 border-2 border-purple-600 hover:bg-purple-600 hover:text-white dark:hover:bg-yellow-400 dark:border-yellow-300 rounded"
        @click="updateSortColumn()"
      >
        SORT in {{ sortOrder === 'ASC' ? 'DESC' : 'ASC' }}
      </button>

      <p>Total Blogs : {{ result?.jareer_getAllBlogs.total }}</p>

      <div
        class="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-4"
      >
        <div
          v-for="blog in result?.jareer_getAllBlogs.data"
          :key="blog.id"
          class="bg-gradient-to-brbg-fixed p-6 block rounded-lg shadow-lg border-2 border-purple-600 dark:border-yellow-300"
        >
          <router-link :to="'/blogs/' + blog.id">
            <div class="max-w-sm pb-4">
              <h5 class="text-xl leading-tight font-medium mb-2">
                {{ blog.title }}
              </h5>
              <p class="text-base mb-4">
                {{ blog.description.substring(0, 100) + '..' }}
              </p>
            </div>
            <hr />
            <div>{{ blog.createdAt }}</div>
            <div class="dark:text-yellow-200">
              <a href="!#">Jareer</a>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- target button, load more manually when clicked -->
    <button
      ref="target"
      @click="loadMore"
      class="text-white cursor-pointer"
    >
      <span v-if="loading">Loading...</span>
      <span v-else-if="!hasNextPage">That's a wrap!</span>
      <span v-else>More</span>
    </button>
  </div>
</template>
