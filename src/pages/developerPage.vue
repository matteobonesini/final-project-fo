<script>

import axios from 'axios';
import starVoteComponent from '../components/starVoteComponent.vue';

export default {
    components: {
        starVoteComponent
    },
    data() {
        return {
            developer: null,
            search: 'L'
        };
    },
    created() {
        this.getDeveloper();
    },
    methods: {
        getDeveloper() {
            axios
                .get(`http://127.0.0.1:8000/api/developer/${this.$route.params.id}`)
                .then(response => {
                    console.log(response.data.result);
                    this.developer = response.data.result;
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
    <div v-if="developer" class="container mx-auto py-16 px-4">
        <div class="sm:w-full lg:w-4/5 mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <!-- Profile Picture -->
            <div>
                <img v-if="developer.profile_picture" class="rounded-lg w-32 object-cover mx-auto"
                    :src="developer.full_img_src" :alt="developer.user.name">
                <img v-else class="rounded-lg w-32 object-cover mx-auto"
                    :src="'https://placehold.co/600x600/1dbf73/FFF/?text=' + developer.user.name"
                    :alt="developer.user.name">
            </div>
            <div>
                <!-- Developer Name -->
                <h2 class="text-4xl font-bold">
                    <span class="align-middle leading-5">{{ developer.user.name }}</span>
                    <span v-if="developer.active_sponsorship"
                        class="bg-[--primary] text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-[--dark-primary] dark:text-zinc-950 leading-5 ms-5">Sponsorizzato</span>

                </h2>
                <!-- Developer Average Vote -->
                <starVoteComponent :avgVote="developer.average_vote" :numberReview="developer.reviews.length" />
                <!-- Link to cv -->
                <div>
                    <a v-if="developer.curriculum" class="me-5" :href="developer.full_cv_src">
                        <button class="btn-primary">Curriculum</button>
                    </a>
                </div>
            </div>
        </div>

        <div class="sm:w-full lg:w-4/5 mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <!-- Link to send a message -->
            <div class="inline-block">
                <a href="#"
                    class="w-full inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="w-full">Manda un messaggio allo sviluppatore</span>
                    <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
            <!-- Link to write a review  -->
            <div class="inline-block">
                <a href="#"
                    class="w-full inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="w-full">Scrivi una recensione</span>
                    <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>

        <!-- List with all the developer info -->
        <ul
            class="sm:w-full lg:w-4/5 mx-auto text-lg font-medium bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 text-[--primary] dark:text-[--dark-primary]">
            <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                Email:
                <div class="font-light text-gray-900 dark:text-white">
                    {{ developer.user.email }}
                </div>
            </li>
            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Numero di telefono:
                <div class="font-light text-gray-900 dark:text-white">
                    {{ developer.phone_number }}
                </div>
            </li>
            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Indirizzo:
                <div class="font-light text-gray-900 dark:text-white">
                    {{ developer.address }}
                </div>
            </li>
            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Anni di Esperienza:
                <div class="font-light text-gray-900 dark:text-white">
                    {{ developer.experience_year }}
                </div>
            </li>
            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Descrizione:
                <div class="font-light text-gray-900 dark:text-white">
                    {{ developer.profile_description }}
                </div>
            </li>
            <li class="w-full px-4 py-2 rounded-b-lg">
                Campi di Lavoro:
                <div class="font-light text-gray-900 dark:text-white">
                    <ul class="max-w-md space-y-1 text-gray-900 list-inside dark:text-white">
                        <li v-for="work_field in developer.work_fields" class="flex items-center font-semibold">
                            <svg class="w-3.5 h-3.5 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            {{ work_field.name }}
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
