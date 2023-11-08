<script>
import headerComponent from "./components/headerComponent.vue";
import mainComponent from "./components/mainComponent.vue";
import footerComponent from "./components/footerComponent.vue";

export default {
  data() {
    return {}
  },
  components: {
    headerComponent,
    mainComponent,
    footerComponent,
  },
};
</script>

<template>
  <div>
    <headerComponent />
    <mainComponent />
    <footerComponent />
  </div>
</template>

<style scoped></style>
