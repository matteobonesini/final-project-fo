import { createStore } from "vuex";

const store =  createStore({
    state: {
        work_field: 'null',
        vote: 'null',
        reviews: 'null'
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
    }
});

export { store };