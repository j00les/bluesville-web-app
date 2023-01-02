<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/user.js';

export default {
  data() {
    return {
      cred: {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
      },
    };
  },

  methods: {
    ...mapActions(useUserStore, ['registerHandler']),
  },
};
</script>
<template>
  <div
    class="mb-9 container mt-24 my-auto max-w-md border-2 border-gray-200 p-3 m-auto bg-white"
    id="top-register"
  >
    <!-- header -->
    <div class="text-center my-6">
      <h1 class="text-3xl font-semibold text-gray-700">Create an account</h1>
      <p class="text-gray-500">
        Create a Bluesville account to create favorite
      </p>
    </div>
    <!-- sign-in -->
    <div class="m-6">
      <form class="mb-4" @submit.prevent="registerHandler(cred)">
        <div class="mb-6">
          <label
            for="username"
            class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
            >Username</label
          >
          <input
            type="username"
            name="username"
            id="username"
            v-model="cred.username"
            placeholder="Your username..."
            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
            >Email Address</label
          >
          <input
            type="email"
            name="email"
            id="email"
            v-model="cred.email"
            placeholder="Your email address"
            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <div class="mb-6">
          <div class="flex justify-between mb-2">
            <label
              for="password"
              class="text-sm text-gray-600 dark:text-gray-400"
              >Password</label
            >
          </div>
          <input
            type="password"
            name="password"
            id="password"
            v-model="cred.password"
            placeholder="Your password"
            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>

        <div class="mb-6">
          <div class="flex justify-between mb-2">
            <label
              for="phone-number"
              class="text-sm text-gray-600 dark:text-gray-400"
              >Phone Number</label
            >
          </div>
          <input
            type="phone-number"
            name="phone-number"
            id="phone-number"
            v-model="cred.phoneNumber"
            placeholder="Your phone number"
            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
          >
            Register
          </button>
        </div>
        <p class="text-sm text-center text-gray-400">
          Already have an account?
          <router-link
            to="/login"
            class="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline"
            >Login</router-link
          >.
        </p>
      </form>
    </div>
  </div>
</template>
<style>
#top-register {
  margin-top: 4rem;
}
</style>
