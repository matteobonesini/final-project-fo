<script>
import headerComponent from "./components/headerComponent.vue";
import mainComponent from "./components/mainComponent.vue";
import footerComponent from "./components/footerComponent.vue";

export default {
  data() {},
  components: {
    headerComponent,
    mainComponent,
    footerComponent,
  },
};
</script>

<template>
  <headerComponent />
  <mainComponent />
  <footerComponent />
</template>

<style scoped></style>
