<script>

import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
            workFields: [],
            developers: []
        };
    },
    created() {
        this.axiosCall();
        this.getDevelopers();
    },
    methods: {
        axiosCall(route) {
            axios
                .get(`http://127.0.0.1:8000/api/work-fields`)
                .then(response => {
                    this.workFields = response.data.results;
                })
                .catch((error) => {
                    if (error.response.status == 404) {
                        this.$router.push({ name: 'not-found' });
                    }
                })
        },
        getDevelopers() {
            if (!this.loading) {
                this.loading = true;
                axios
                    .get(`http://127.0.0.1:8000/api/developers/null`)
                    .then(response => {
                        this.developers = response.data.results;
                        this.loading = false;
                    })
                    .catch((error) => {
                        if (error.response.status == 404) {
                            this.$router.push({ name: 'not-found' });
                        }
                    })
            }
        }
    }
};
</script>

<template>
    <div class="container mx-auto py-10 px-4">
        <section class="bg-zinc-300 dark:bg-zinc-800 rounded-xl">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    <span class="text-[--primary] dark:text-[--dark-primary]">B</span>Developer
                </h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Il luogo
                    dove gli sviluppatori creano il tuo futuro.</p>
                <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row sm:justify-center space-x-4">
                    <select id="countries" v-model="store.work_field"
                        class="sm:w-full md:w-1/2 bg-zinx-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
                        <option selected value="null">Cerca uno sviluppatore per categoria</option>
                        <option v-for="workField in workFields" :value="workField.id">{{ workField.name }}</option>
                    </select>
                    <router-link :to="{ name: 'search' }">
                        <button type="button"
                            class="focus:outline-none text-white bg-[--primary] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[--dark-primary] dark:hover:bg-green-700 dark:focus:ring-green-800">Cerca</button>
                    </router-link>

                </div>
            </div>
        </section>

        <section class="mt-10">
            <h5 class="text-center text-black dark:text-white text-3xl font-bold">Scopri i servizi dei nostri sponsor</h5>
            <div v-if="developers" class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                <router-link :to="{ name: 'developer', params: { id: developer.user.id } }" class="mx-auto"
                    v-for="developer in developers" href="">
                    <img :src="developer.full_img_src" class="rounded-full h-56 w-56 object-cover">
                    <p class="text-center mt-3 text-lg font-semibold">{{ developer.user.name }}<span
                            class="bg-[--primary] text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-[--dark-primary] dark:text-zinc-950 leading-5 ms-5">S</span>
                    </p>
                </router-link>
            </div>
            <div v-else class="flex items-center justify-center w-full h-56">
                <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
