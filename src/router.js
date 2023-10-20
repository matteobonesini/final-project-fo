import { createRouter, createWebHistory } from "vue-router";

import DeveloperPage from './pages/DeveloperPage.vue';
import HomePage from './pages/HomePage.vue';
import ResultsPage from './pages/ResultsPage.vue';
import MessagePage from './pages/MessagePage.vue'
import ReviewPage from './pages/ReviewPage.vue'
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
      path: '/search/:search',
      name: 'search',
      component: ResultsPage
    },
    {
      path: '/developer/:id',
      name: 'developer',
      component: DeveloperPage
    },
    {
      path: '/developer/:id/message',
      name: 'message',
      component: MessagePage
    },
    {
      path: '/developer/:id/review',
      name: 'review',
      component: ReviewPage
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage
    }
  ]
});

export { router };
