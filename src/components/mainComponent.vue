<script>
import { RouterView } from "vue-router";
export default {
  data() {
    return {
      msg: "",
    };
  },
  components: {
    RouterView,
  },
};
</script>

<template>
  <main class="bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white">
    <div class="container mx-auto">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  /* altezza viewport - altezza header e footer */
  min-height: calc(100vh - 140px);
}
</style>
