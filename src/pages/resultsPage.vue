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
        <div class="grid grid-cols-3 gap-10 pt-10">
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

        <div class="grid grid-cols-4 gap-10 pt-10">
            <router-link :to="{ name: 'developer', params: { id: developer.user.id } }" v-for="developer in developers"
                v-show="showCard(developer)"
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ developer.user.name }}
                </h5>
                <starVoteComponent :avgVote="developer.average_vote" :numberReview="developer.reviews.length" />
                <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology
                    acquisitions of 2021 so far, in reverse chronological order.</p>
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
