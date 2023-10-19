<script>

import axios from 'axios';
import starVoteComponent from '../components/starVoteComponent.vue';

export default {
    components: {
        starVoteComponent
    },
    data() {
        return {
            workFields: [],
            votes: [],
            developers: [],
            work_field: 'null',
            vote: 'null',
            reviews: 'null'
        };
    },
    created() {
        this.workFields = this.axiosCall('work-fields');
        this.votes = this.axiosCall('votes');
    },
    methods: {
        axiosCall(route) {
            axios
                .get(`http://127.0.0.1:8000/api/${route}`)
                .then(response => {
                    if (route == 'work-fields')
                        this.workFields = response.data.results;
                    if (route == 'votes')
                        this.votes = response.data.results;
                })
                .catch((error) => {
                    if (error.response.status == 404) {
                        this.$router.push({ name: 'not-found' });
                    }
                })
        },
        getDevelopers() {
            axios
                .get(`http://127.0.0.1:8000/api/developers/${this.work_field}`)
                .then(response => {
                    this.developers = response.data.results;
                })
                .catch((error) => {
                    if (error.response.status == 404) {
                        this.$router.push({ name: 'not-found' });
                    }
                })
        },
        showCard(developer) {
            let voteCheck = true;
            if (this.vote != 'null') {
                voteCheck = developer.average_vote >= this.vote;
            }
            let reviewsCheck = true;
            if (this.reviews != 'null') {
                reviewsCheck = developer.reviews.length >= this.reviews;
            }
            return voteCheck && reviewsCheck;
        }
    },
};
</script>

<template>
    <div class="container mx-auto px-8">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
            <div>
                <label for="work_fields" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Campo
                    di Lavoro</label>
                <select id="work_fields" @change="getDevelopers()" v-model="work_field"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="null">Seleziona un Campo di Lavoro</option>
                    <option v-for="workField in workFields" :value="workField.id">{{ workField.name }}</option>
                </select>
            </div>
            <div>
                <label for="vote" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Voto
                    Medio</label>
                <select id="vote" v-model="vote"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="null">Seleziona un Voto Medio</option>
                    <option v-for="vote in votes" :value="vote.value">{{ vote.name }}
                        {{ vote.name != 'Ottimo' ? ' e migliore' : '' }}</option>
                </select>
            </div>
            <div>
                <label for="reviews" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero Di
                    Recensioni</label>
                <select id="reviews" v-model="reviews"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="null">Seleziona un Numero di Recensioni</option>
                    <option v-for="index in 5" :value="index">{{ index }} e più</option>
                </select>
            </div>
        </div>

        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
            <router-link :to="{ name: 'developer', params: { id: developer.user.id } }" v-for="developer in developers"
                v-show="showCard(developer)">
                <div
                    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
                    <div>
                        <img v-if="developer.profile_picture" class="rounded-lg w-full object-cover aspect-square"
                            :src="developer.full_img_src" :alt="developer.user.name" />
                        <img v-else class="rounded-lg w-full object-cover aspect-square"
                            :src="'https://placehold.co/600x600/1dbf73/FFF/?text=' + developer.user.name"
                            :alt="developer.user.name">
                    </div>
                    <div class="p-5">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                            developer.user.name }}</h5>
                        <starVoteComponent :avgVote="developer.average_vote" :numberReview="developer.reviews.length" />
                        <button
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
