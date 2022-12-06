<script lang="ts" setup>
import NavBar from './components/NavBar.vue';
</script>
<template>
  <div class="">
    <div class="dark:bg-slate-800">
      <div class="px-5 md:px-20 lg:px-20">
        <NavBar />
        <h1
          class="text-7xl font-bold dark:text-white text-violet-700 text-center pt-24 pb-10"
        >
          Vue GraphQL Blog
        </h1>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
