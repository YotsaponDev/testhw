<template>
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <div id="sidebar-overlay" @click="overlayOnclick()"></div>
</template>
<script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive
  } from 'vue'

  export default defineComponent({
    components: {

    },
    setup() {
      onMounted(() => {

      })
      function overlayOnclick(){
        document.body.className = "sidebar-mini layout-fixed sidebar-closed sidebar-collapse"
      }

      return {
        overlayOnclick
      }
    }
  })
</script>