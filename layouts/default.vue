<template>

    <NavBar />
    <SideBar />
    <slot />
    <Footer />
    <SideBarOverlay />

</template>

<script lang="ts">
  import NavBar from '~/components/layout/navBar.vue';
  import SideBar from '~/components/layout/sideBar.vue';
  import Footer from '~/components/layout/footer.vue';
  import SideBarOverlay from '~/components/layout/sideBarOverlay.vue';

  import {
    defineComponent,
    onMounted,
    reactive
  } from 'vue'

  export default defineComponent({
    components: {
      NavBar,
      SideBar,
      Footer,
      SideBarOverlay
    },
    setup() {
      const obj = reactive({
        windowSize: {
          width: 0,
          height: 0
        }
      })

      onMounted(() => {
        let el = document.getElementById("__nuxt")
        el?.classList.add("wrapper")
      })
    }
  })
</script>