<template>
  <div id="about">
    <!-- <h1 class="text-yellow-300 h-screen">ABOUT</h1> -->

    <h1 class="text-yellow-300">
      <p v-if="error">Something went wrong...</p>
      <p v-if="loading">Loading...</p>
      <div v-else>
        <ul v-for="blog in result.jareer_getAllBlogs.data" :key="blog.id">
          <li>{{ blog.id }}</li>
          <li>{{ blog.title }}</li>
        </ul>
      </div>
      <button class="bg-red-600" @click="loadMore()">Load More</button>
    </h1>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { BLOGS_LIST } from '../graphql/listBlogs';

export default {
  props: ['type'],

  setup(props) {
    const PARAMS = {
      paginate: {
        limit: 3,
        offset: 1,
      },
      sort: {
        fieldName: 'createdAt',
        order: 'ASC',
      },
    };
    const { result, loading, error, fetchMore } = useQuery(BLOGS_LIST, PARAMS);

    // create ref for observer
    const observer = ref(null);
    // create ref for target element for observer to observe
    const target = ref(null);

    const loadMore = () => {
      const resultLength = result?.value.jareer_getAllBlogs.data.length;
      const offsetValue = result?.value.jareer_getAllBlogs.offset;

      console.log(offsetValue);

      fetchMore({
        variables: {
          paginate: {
            limit: resultLength,
            offset: offsetValue,
          },
          sort: {
            fieldName: 'createdAt',
            order: 'ASC',
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // No new
          if (!fetchMoreResult.jareer_getAllBlogs)
            return previousResult.jareer_getAllBlogs;

          return {
            jareer_getAllBlogs: {
              ...previousResult.jareer_getAllBlogs,
              data: [
                ...previousResult.jareer_getAllBlogs.data,
                ...fetchMoreResult.jareer_getAllBlogs.data,
              ],
              offset: offsetValue + 1,
            },
          };
        },
      });
    };

    return {
      result,
      loadMore,
      error,
      loading,
    };
  },
};
</script>
