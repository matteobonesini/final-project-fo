import { createStore } from "vuex";

const store =  createStore({
    state: {
        work_field: 'null',
        vote: 'null',
        reviews: 'null',
        theme: 'system'
    },
    mutations: {
        setWork(state, payload) {
            state.work_field = payload;
        },
        setVote(state, payload) {
            state.vote = payload;
        },
        setReviews(state, payload) {
            state.reviews = payload;
        },
        setTheme(state, payload) {
            if (payload === 'dark' || (payload === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
            state.theme = payload;
            localStorage.theme = state.theme;
        }
    },
    actions: {
        setWork({commit}, payload) {
            return new Promise((resolve) => {
                commit("setWork", payload);
                resolve();
            });
        },
        setVote({commit}, payload) {
            return new Promise((resolve) => {
                commit("setVote", payload);
                resolve();
            });
        },
        setReviews({commit}, payload) {
            return new Promise((resolve) => {
                commit("setReviews", payload);
                resolve();
            });
        },
        setTheme({commit}, payload) {
            return new Promise((resolve) => {
                commit("setTheme", payload);
                resolve();
            });
        },
    }
});

export { store };