<script>

import axios from 'axios';
import starVoteComponent from '../components/starVoteComponent.vue';

export default {
    components: {
        starVoteComponent
    },
    data() {
        return {
            work_field: this.$store.state.work_field,
            vote: this.$store.state.vote,
            reviews: this.$store.state.reviews,
            loading: false,
            workFields: [],
            votes: [],
            developers: [],
        };
    },
    created() {
        this.axiosCall('work-fields');
        this.axiosCall('votes');
        this.getDevelopers()
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
            if (!this.loading) {
                this.loading = true;
                this.setWorkField();
                this.setVote();
                this.setReviews();
                axios
                    .get(`http://127.0.0.1:8000/api/developers/${this.$store.state.work_field}-${this.$store.state.vote}-${this.$store.state.reviews}`)
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
        },
        setWorkField() {
            this.$store.dispatch("setWork", this.work_field).then(() => { });
        },
        setVote() {
            this.$store.dispatch("setVote", this.vote).then(() => { });
        },
        setReviews() {
            this.$store.dispatch("setReviews", this.reviews).then(() => { });
        }
    },
};
</script>

<template>
    <div class="container mx-auto px-8">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
            <!-- select for work fields -->
            <div>
                <label for="work_fields" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Campo
                    di Lavoro</label>
                <select id="work_fields" @change="getDevelopers()" v-model="work_field"
                    class="bg-zinc-200 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
                    <option selected value="null">Seleziona un Campo di Lavoro</option>
                    <option v-for="workField in workFields" :value="workField.id">{{ workField.name }}</option>
                </select>
            </div>
            <!-- select for average vote -->
            <div>
                <label for="vote" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Voto
                    Medio</label>
                <select id="vote" @change="getDevelopers()" v-model="vote" :disabled="work_field == 'null'"
                    class="bg-zinc-200 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 disabled:bg-zinc-100 dark:disabled:bg-zinc-900 disabled:text-zinc-200 dark:disabled:text-zinc-700">
                    <option selected value="null">Seleziona un Voto Medio</option>
                    <option v-for="vote in votes" :value="vote.value">{{ vote.name }}
                        {{ vote.name != 'Ottimo' ? ' e migliore' : '' }}</option>
                </select>
            </div>
            <!-- select for number of reviews -->
            <div>
                <label for="reviews" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero Di
                    Recensioni</label>
                <select id="reviews" @change="getDevelopers()" v-model="reviews" :disabled="work_field == 'null'"
                    class="bg-zinc-200 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 disabled:bg-zinc-100 dark:disabled:bg-zinc-900 disabled:text-zinc-200 dark:disabled:text-zinc-700">
                    <option selected value="null">Seleziona un Numero di Recensioni</option>
                    <option v-for="index in [3, 6, 9, 12, 15]" :value="index">{{ index }} e più</option>
                </select>
            </div>
        </div>

        <div v-if="!loading" class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">

            <template v-for="developer in developers">
                <!-- sponsorship developer -->
                <router-link :to="{ name: 'developer', params: { id: developer.user.id } }"
                    v-if="developer.active_sponsorship">
                    <div class="bg-zinc-300 rounded-lg shadow dark:bg-zinc-800 h-full">
                        <div class="p-5 relative">
                            <img v-if="developer.profile_picture" class="rounded-lg w-full object-cover aspect-square"
                                :src="developer.full_img_src" :alt="developer.user.name" />
                            <img v-else class="rounded-lg w-full object-cover aspect-square"
                                :src="'https://placehold.co/600x600/1dbf73/FFF/?text=' + developer.user.name"
                                :alt="developer.user.name">
                            <span
                                class="bg-[--tertiary] text-black text-sm font-medium px-2.5 py-0.5 rounded dark:bg-[--dark-tertiary] dark:text-black leading-5 absolute left-6 bottom-6">In
                                Evidenza</span>
                        </div>
                        <div class="p-5">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                                developer.user.name }}</h5>

                            <starVoteComponent :avgVote="developer.average_vote" :numberReview="developer.reviews.length" />
                            <button
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[--tertiary] focus:ring-4 focus:outline-none dark:bg-[--dark-tertiary]">
                                Dettaglio profilo
                                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </router-link>
            </template>

            <template v-for="developer in developers">
                <!-- not sponsorship developer -->
                <router-link :to="{ name: 'developer', params: { id: developer.user.id } }"
                    v-if="!developer.active_sponsorship">
                    <div class="bg-zinc-300 rounded-lg shadow dark:bg-zinc-800 h-full">
                        <div class="p-5">
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
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[--tertiary] focus:ring-4 focus:outline-none dark:bg-[--dark-tertiary]">
                                Dettaglio profilo
                                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </router-link>
            </template>
        </div>

        <!-- loading animation -->
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
    </div>
</template>

<style scoped></style>
