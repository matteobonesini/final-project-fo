<script>

import axios from 'axios';

export default {
    data() {
        return {
            workFields: [],
            workField: 'null',
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
    <div class="container mx-auto py-10">
        <section class="bg-gray-300 dark:bg-gray-900 rounded-xl">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    <span class="text-[--primary] dark:text-[--dark-primary]">B</span>Developers
                </h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Il luogo
                    dove gli sviluppatori creano il tuo futuro.</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <select id="countries" v-model="workField"
                        class="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="null">Cerca uno sviluppatore per categoria</option>
                        <option v-for="workField in workFields" :value="workField.id">{{ workField.name }}</option>
                    </select>
                    <router-link :to="{ name: 'search', params: { search: workField } }">
                        <button type="button"
                            class="focus:outline-none text-white bg-[--primary] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[--dark-primary] dark:hover:bg-green-700 dark:focus:ring-green-800">Cerca</button>
                    </router-link>

                </div>
            </div>
        </section>

        <section class="mt-10">
            <h5 class="text-center text-black dark:text-white text-3xl font-bold">Scopri i servizi dei nostri sponsor</h5>
            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                <router-link :to="{ name: 'developer', params: { id: developer.user.id } }" class="mx-auto"
                    v-for="developer in developers" href="">
                    <img :src="developer.full_img_src" class="rounded-full h-56 w-56 object-cover">
                    <p class="text-center mt-3 text-lg font-semibold">{{ developer.user.name }}<span
                            class="bg-[--primary] text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-[--dark-primary] dark:text-zinc-950 leading-5 ms-5">S</span>
                    </p>
                </router-link>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
