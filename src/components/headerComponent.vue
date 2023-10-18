<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<template>
  <header class="bg-zinc-200 dark:bg-zinc-900 text-black dark:text-white">
    <nav>
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link :to="{ name: 'home' }" class="flex items-center">
          <img src="/LogoSmallRid.png" class="h-8 mr-3 w-48 h-12 object-cover" alt="BDeveloper Logo" />
        </router-link>
        <button data-collapse-toggle="navbar-default" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col md:flex-row">
            <li>
              <router-link :to="{ name: 'home' }" class="block py-2 pl-3 pr-4 hover:text-[--tertiary]"
                :class="this.$route.name == 'home' ? 'text-[--primary]' : ''">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'search' }" class="block py-2 pl-3 pr-4 hover:text-[--tertiary]"
                :class="this.$route.name == 'search' ? 'text-[--primary]' : ''">Ricerca</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  height: 80px;
}
</style>
