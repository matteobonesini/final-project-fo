<script>

import axios from 'axios';

export default {
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
                    this.developer = response.data.results;
                    console.log(response.data.results);
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
    <div v-if="developer">
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{{ developer.user.name }}</h2>
        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            <li>
                <img :src="developer.full_img_src" alt="">
            </li>
            <li>
                {{ developer.user.email }}
            </li>
            <li>
                {{ developer.phone_number }}
            </li>
            <li>
                {{ developer.address }}
            </li>
            <li>
                <a :href="developer.full_cv_src">
                    Curriculum
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
