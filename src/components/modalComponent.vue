<script>
export default {
    data() {
    },
    props: {
        id: Number,
        name: String,
        message: String
    }
};
</script>

<template>
    <div class="absolute top-0 left-0 w-full h-full bg-zinc-950">
        <div class="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
            <div
                class="bg-zinc-100 dark:bg-zinc-900 text-black dark:text-green-600 px-20 py-10 rounded-xl border-2 border-green-600 text-center">
                <p>{{ message }}</p>
                <router-link :to="{ name: 'developer', params: { id: id } }" class="block mt-5">
                    <button type="button"
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Ritorna
                        a {{ name }}</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped></style>