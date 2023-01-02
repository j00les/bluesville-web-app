import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import DetailView from '@/views/DetailView.vue';
import FavoriteView from '@/views/FavoriteView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },

    {
      path: '/favorites',
      name: 'favorites',
      component: FavoriteView,
    },

    {
      path: '/details/:productId',
      name: 'details',
      component: DetailView,
    },
  ],
});

router.beforeEach((to, from) => {
  if (!localStorage.getItem('access_token') && to.name === 'favorites') {
    return { name: 'login' };
  } else if (
    localStorage.getItem('access_token') &&
    (to.name === 'login' || to.name === 'register')
  ) {
    return { path: '/' };
  }
});

export default router;
