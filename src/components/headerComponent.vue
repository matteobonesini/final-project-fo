<script>
export default {
  data() {
    return {
      showMenu: false
    };
  },
};
</script>

<template>
  <header class="bg-[--tertiary] dark:bg-zinc-900 text-[--dark-text] md:h-20 sticky top-0 z-10">
    <nav>
      <div class="flex flex-wrap items-center justify-between mx-auto py-4 px-5 md:px-10">
        <router-link :to="{ name: 'home' }" class="flex items-center">
          <img src="/logo-hor-final.png" class="h-12 mr-3 w-48 object-cover" alt="BDeveloper Logo" />
        </router-link>
        <button data-collapse-toggle="navbar-default" type="button" @click="showMenu = !showMenu"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden"
          aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div class="w-full md:block md:w-auto pt-5 md:pt-0" id="navbar-default"
          :class="{ 'block': showMenu, 'hidden': !showMenu }">
          <ul class="font-medium flex flex-col md:flex-row">
            <li>
              <router-link :to="{ name: 'home' }" class="block py-2 pl-3 pr-4 hover:text-[--primary]"
                :class="this.$route.name == 'home' ? ' dark:text-white underline decoration-4 underline-offset-8' : ''">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'search' }" class="block py-2 pl-3 pr-4 hover:text-[--primary]"
                :class="this.$route.name == 'search' ? 'dark:text-white underline decoration-4 underline-offset-8' : ''">Ricerca</router-link>
            </li>
            <li>
              <a class="block py-2 pl-3 pr-4 hover:text-[--primary]" href="http://127.0.0.1:8000/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
