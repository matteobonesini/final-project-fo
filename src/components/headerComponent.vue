<script>
export default {
  data() {
    return {
      showMenu: false,
      theme: this.$store.state.theme,
      themeStatus: 'Auto'
    };
  },
  created() {
    switch (this.$store.state.theme) {
      case 'light':
        this.themeStatus = 'Chiaro';
        break;
      case 'dark':
        this.themeStatus = 'Scuro';
        break;
      case 'system':
        this.themeStatus = 'Auto'
    }
  },
  methods: {
    setTheme() {
      switch (this.theme) {
        case 'light':
          this.$store.dispatch("setTheme", 'dark').then(() => { });
          this.theme = 'dark';
          this.themeStatus = 'Scuro';
          break;
        case 'dark':
          this.$store.dispatch("setTheme", 'system').then(() => { });
          this.theme = 'system';
          this.themeStatus = 'Auto';
          break;
        default:
          this.$store.dispatch("setTheme", 'light').then(() => { });
          this.theme = 'light';
          this.themeStatus = 'Chiaro';
      }

    }
  }
};
</script>

<template>
  <header class="bg-green-900 dark:bg-zinc-900 text-[--dark-text] md:h-20 sticky top-0 z-10">
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
              <div class="block py-2 pl-3 pr-8 cursor-pointer hover:text-[--primary]" @click="setTheme()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 inline-block align-middle" v-if="theme === 'light'">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 inline-block align-middle" v-if="theme === 'dark'">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 inline-block align-middle" v-if="theme === 'system'">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
                <span class="align-middle ml-2">{{ themeStatus }}</span>
              </div>
            </li>
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
