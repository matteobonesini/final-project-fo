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
  created() {
    this.setTheme();
  },
  methods: {
    setTheme() {
      if (this.$store.state.theme === 'dark' || (this.$store.state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
};
</script>

<template>
  <headerComponent />
  <mainComponent />
  <footerComponent />
</template>

<style scoped></style>
