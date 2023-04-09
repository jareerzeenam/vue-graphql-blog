<script setup lang="ts">
import Blog from '../components/Blog.vue';
</script>

<template>
  <div id="blog">
    <div class="h-screen">
      <h1 class="text-2xl">
        Blog : {{ $route.params.id }}
        <Blog :id="$route.params.id" />
      </h1>
    </div>
  </div>
</template>
