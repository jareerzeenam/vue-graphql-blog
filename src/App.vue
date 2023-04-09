<script lang="ts" setup>
import NavBar from './components/NavBar.vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div>
    <div class="dark:bg-slate-800 dark:text-white">
      <div class="px-5 md:px-20 lg:px-20">
        <NavBar @toggle-test="toggleDark()" />

        <h1
          class="text-7xl font-bold dark:text-white text-violet-700 text-center pt-24 pb-10"
        >
          <span class="dark:text-yellow-200">
            {{ isDark ? 'Dark' : 'Light' }} Mode
          </span>
          Vue GraphQL Blog
        </h1>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
