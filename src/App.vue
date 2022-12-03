<template>
  <div class="container mx-auto">
    <h1 class="text-7xl font-bold text-violet-400/25 text-center py-10">
      Vue GraphQL Blog
    </h1>

    <!-- <RouterLink to="/blogs" class="button">TEST</RouterLink> -->

    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>

    <router-view></router-view>

    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <button @click="updateSortColumn()">
        SORT in {{ sortOrder === 'ASC' ? 'DESC' : 'ASC' }}
      </button>
      <p>Per Page : {{ perPage }}</p>
      <p>Total Data : {{ result.jareer_getAllBlogs.total }}</p>
      <div class="flex flex-wrap gap-5 py-5 justify-center">
        <div
          class="basis-1/5"
          v-for="blog in result.jareer_getAllBlogs.data"
          :key="blog.id"
        >
          <div
            class="h-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <a href="#">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-400 transition-all"
              >
                {{ blog.title }}
              </h5>
              <p class="py-4 font-normal text-gray-700 dark:text-gray-400">
                {{ blog.description.substring(0, 100) + '..' }}
              </p>
            </a>
            <footer
              class="sticky top-[100vh] pt-2 border-t border-gray-300 text-gray-600"
            >
              <div class="flex flex-row space-x-2">
                <div>{{ blog.createdAt }}</div>
                <div class="text-blue-500"><a href="!#">Jareer</a></div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center">
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
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { BLOGS_LIST } from './graphql/listBlogs';

export default {
  name: 'App',
  props: {
    perpage: {
      type: Number,
      required: true,
      default: 12,
    },
  },
  setup(props) {
    const sortOrder = ref('ASC');
    const limitVal = ref(12);
    const perPage = ref(props.perpage);
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

      perPage.value = limitVal.value;
    };

    const { result, loading, error } = useQuery(BLOGS_LIST, PARAMS);

    return {
      result,
      loading,
      error,
      updateSortColumn,
      sortOrder,
      showMore,
      perPage,
    };
  },
};
</script>

<style scoped></style>
