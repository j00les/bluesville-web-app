<script>
import { mapActions, mapState } from 'pinia';
import { useUserStore } from '../stores/user';

export default {
  methods: {
    ...mapActions(useUserStore, ['logoutHandler', 'loginCheck']),
  },

  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
  },
  created() {
    this.loginCheck();
  },
};
</script>
<template>
  <nav class="p-2 px-9">
    <div
      class="container flex items-center justify-between px-6 py-2 mx-auto mb-4"
    >
      <router-link to="/">
        <img
          src="https://www.thebluesville.com/wp-content/uploads/2022/04/LOGO_BLV_WEB_1-1-1.png"
          class="mr-3 sm:h-5"
          alt="Bluesville Logo"
        />
      </router-link>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 text-gray-500 border border-gray-600 rounded appearance-none hover:text-gray-800 hover:border-teal-500 focus:outline-none"
        >
          <svg
            class="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:block">
        <ul class="flex gap-3 text-md">
          <li>
            <router-link
              class="text-sm font-bold block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-gray-400 md:p-0 dark:text-white md:hover:text-blue-700 text-bold"
              to="/"
            >
              HOME</router-link
            >
          </li>

          <li v-if="isLoggedIn">
            <router-link
              class="uppercase text-sm font-bold block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-gray-400 md:p-0 dark:text-white md:hover:text-blue-700 text-bold"
              to="/favorites"
            >
              my favorites
            </router-link>
          </li>
          <li>
            <router-link
              class="block font-bold text-sm py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-gray-400 md:p-0 dark:text-white md:hover:text-blue-700 text-bold"
              v-if="!isLoggedIn"
              to="/login"
            >
              LOGIN
            </router-link>
          </li>
          <li
            class="block text-sm font-bold py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-gray-400 md:p-0 dark:text-white md:hover:text-red-700 text-bold"
            id="logout"
            v-if="isLoggedIn"
            @click="logoutHandler"
          >
            LOGOUT
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style>
#logout {
  cursor: pointer;
}
</style>
