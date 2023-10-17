<script>

import axios from 'axios';

export default {
    data() {
        return {
            workFields: [],
            developers: [],
            search: 'null'
        };
    },
    created() {
        axios
            .get(`http://127.0.0.1:8000/api/work-fields`)
            .then(response => {
                this.workFields = response.data.results;
                console.log(response.data);
            })
            .catch((error) => {
                if (error.response.status == 404) {
                    this.$router.push({ name: 'not-found' });
                }
            })

    },
    methods: {
        getDevelopers() {
            axios
                .get(`http://127.0.0.1:8000/api/developers/${this.search}`)
                .then(response => {
                    this.developers = response.data.developers;
                    console.log(response.data.developers);
                })
                .catch((error) => {
                    if (error.response.status == 404) {
                        this.$router.push({ name: 'not-found' });
                    }
                })
        }
    },
};
</script>

<template>
    {{ search }}
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
    <select id="countries" @change="getDevelopers()" v-model="search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected value="null">Choose a country</option>
        <option v-for="workField in workFields" :value="workField.id">{{ workField.name }}</option>
    </select>


    <div class="container">
        <div class="grid grid-cols-4 gap-4">
            <router-link :to="{ name: 'developer', params: { id: 1 } }" v-for="developer in developers"
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ developer.user.name }}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology
                    acquisitions of 2021 so far, in reverse chronological order.</p>
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
