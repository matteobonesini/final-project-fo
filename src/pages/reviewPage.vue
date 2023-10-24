<script>

import axios from 'axios';

export default {
    data() {
        return {
            customerName: null,
            description: null,
            success: false,
            error: false,
            vote: '0'
        };
    },
    methods: {
        sendReview() {
            if (Number(this.vote) && Number(this.vote) >= 1 && Number(this.vote) <= 5) {
                axios
                    .post(`http://127.0.0.1:8000/api/review`, {
                        'developer_id': this.$route.params.id,
                        'customer_name': this.customerName,
                        'description': this.description,
                        'vote': Number(this.vote)
                    })
                    .then(response => {
                        console.log(response.data)
                        this.error = false
                        this.success = true;
                        setTimeout(() => {
                            this.$router.push({ name: 'developer', params: { id: this.$route.params.id } })
                        }, 5000);
                    })
                    .catch((error) => {
                        this.success = false;
                        this.error = true;
                    })
            }
        }
    },
};
</script>

<template>
    <div class="container px-5 w-full md:w-3/5  mx-auto">
        <form @submit.prevent="sendReview()" class="pt-10">
            <h2 class="text-xl font-bold mb-5 text-[--tertiary] dark:text-[--dark-tertiary]">Scrivi una recensione su {{
                this.$route.query.dev }}</h2>
            <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert">
                Errore nell'invio del messaggio! Controlla i campi del form e riprova.
            </div>
            <div v-if="success"
                class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert">
                Inviato con successo!
            </div>
            <div class="mb-6">
                <label for="customer_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                        class="text-red-500 text-lg me-1">*</span>Nome</label>
                <input v-model="customerName" type="text" id="customer_name" maxlength="64"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    required>
            </div>
            <div class="mb-6">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                        class="text-red-500 text-lg me-1">*</span>Voto</label>
                <div class="flex items-center">
                    <select id="countries" v-model="vote" required
                        class="w-1/6 me-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
                        <option value="0" selected>-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <div class="flex items-center space-x-1">
                        <svg v-for="i in Number(vote)" class="w-6 h-6 text-yellow-300" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg v-for="i in (5 - Number(vote))" class="w-6 h-6 text-gray-300 dark:text-gray-500"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contenuto
                    messaggio</label>
                <textarea v-model="description" id="description" rows="4" maxlength="2048"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Lascia un messaggio..."></textarea>
            </div>
            <button type="submit" :disabled="success"
                class="text-white bg-[--tertiary] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[--tertiary]  disabled:bg-zinc-500">Invia</button>
        </form>
    </div>
</template>

<style scoped></style>
