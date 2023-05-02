<template>
  <section>
    <span> This is module Blog</span>
    <p>Blog post with the id: {{ currentRoute.params.id }}</p>
    <span>Current value from blogStore: {{ blogStore.value }}</span>
  </section>
</template>
  
<script setup lang="ts">
  import { useBlog } from "../../composables/useBlog";
  import { useBlogStore } from "../../store/store";
  const { currentRoute } = useRouter();
  const { blog } = useBlog();
  const blogStore = useBlogStore();
</script>