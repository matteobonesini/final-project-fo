<script>

import axios from 'axios';
import modalComponent from '../components/modalComponent.vue';

export default {
    components: {
        modalComponent
    },
    data() {
        return {
            name: null,
            email: null,
            title: null,
            content: null,
            success: false,
            error: false
        };
    },
    methods: {
        sendMessage() {
            axios
                .post(`http://127.0.0.1:8000/api/message`, {
                    'developer_id': this.$route.params.id,
                    'name': this.name,
                    'email': this.email,
                    'title': this.title,
                    'content': this.content
                })
                .then(response => {
                    this.error = false;
                    this.success = true;
                })
                .catch((error) => {
                    this.success = false;
                    this.error = true;
                })
        }
    },
};
</script>

<template>
    <div class="container px-5 w-full md:w-3/5  mx-auto">
        <modalComponent v-if="success" :id="this.$route.params.id" :name="this.$route.query.dev"
            message="Inviato con successo!" />
        <form @submit.prevent="sendMessage()" class="pt-10 pb-1">
            <h2 class="text-xl font-bold mb-5 text-[--tertiary] dark:text-[--dark-tertiary]">Manda un messaggio a {{
                this.$route.query.dev }}</h2>
            <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert">
                Errore nell'invio del messaggio! Controlla i campi del form e riprova.
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                        class="text-red-500 text-lg me-1">*</span>Nome</label>
                <input v-model="name" type="text" id="name" maxlength="255"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required>
            </div>
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                        class="text-red-500 text-lg me-1">*</span>Email</label>
                <input v-model="email" type="email" id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required>
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                        class="text-red-500 text-lg me-1">*</span>Titolo
                    messaggio</label>
                <input v-model="title" type="text" id="title" maxlength="64"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required>
            </div>
            <div class="mb-6">
                <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span
                        class="text-red-500 text-lg me-1">*</span>Contenuto
                    messaggio</label>
                <textarea v-model="content" id="content" rows="4" maxlength="2048"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Lascia un messaggio..." required></textarea>
            </div>
            <button type="submit" :disabled="success"
                class="text-white bg-[--tertiary] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[--tertiary] disabled:bg-zinc-500">Invia</button>
        </form>
    </div>
</template>

<style scoped></style>
