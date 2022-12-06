<template>
  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <div v-else>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      @click="updateSortColumn()"
    >
      SORT in {{ sortOrder === 'ASC' ? 'DESC' : 'ASC' }}
    </button>

    <p class="text-white">Total Data : {{ result.jareer_getAllBlogs.total }}</p>

    <div class="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
      <div
        class="bg-gradient-to-br from-indigo-100 to-violet-200 bg-fixed p-6 block rounded-lg shadow-lg"
        v-for="blog in result.jareer_getAllBlogs.data"
        :key="blog.id"
      >
        <router-link :to="'/blogs/' + blog.id">
          <div class="max-w-sm pb-4">
            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
              {{ blog.title }}
            </h5>
            <p class="text-gray-700 text-base mb-4">
              {{ blog.description.substring(0, 100) + '..' }}
            </p>
          </div>
          <hr />
          <div>{{ blog.createdAt }}</div>
          <div class="text-blue-500"><a href="!#">Jareer</a></div>
        </router-link>
      </div>
    </div>
  </div>

  <div class="flex justify-center mt-10">
    <button
      type="button"
      class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
      @click="showMore"
    >
      Load More
      <svg
        aria-hidden="true"
        class="ml-2 -mr-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { BLOGS_LIST } from '../graphql/listBlogs';

export default {
  name: 'Blogs',

  setup() {
    const sortOrder = ref('ASC');
    const limitVal = ref(16);

    const PARAMS = {
      paginate: {
        limit: limitVal,
        offset: 5,
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

    const showMore = () => {
      var activePageLimit = limitVal.value;

      limitVal.value = activePageLimit + 4;
    };

    const { result, loading, error } = useQuery(BLOGS_LIST, PARAMS);

    return {
      result,
      loading,
      error,
      updateSortColumn,
      sortOrder,
      showMore,
    };
  },
};
</script>
