import { createRouter, createWebHistory } from "vue-router";

import DeveloperPage from './pages/DeveloperPage.vue';
import HomePage from './pages/HomePage.vue';
import ResultsPage from './pages/ResultsPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/search',
      name: 'search',
      component: ResultsPage
    },
    {
      path: '/developer/:id',
      name: 'developer',
      component: DeveloperPage
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage
    }
  ]
});

export { router };