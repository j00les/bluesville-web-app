<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    ...mapActions(useUserStore, ['loginHandler', 'handleCredentialResponse']),

    login(cred) {
      this.loginHandler(cred);
    },

    googleBtn() {
      window.onload = () => {
        const cb = this.handleCredentialResponse;
        google.accounts.id.initialize({
          client_id:
            '221342135828-pnf98n5n2j73okpvia724h8r8qe8rnoi.apps.googleusercontent.com',
          callback: cb,
        });
        google.accounts.id.renderButton(document.getElementById('customBtn'), {
          theme: 'outline',
          width: 390,
        });
      };
    },
  },

  created() {
    this.googleBtn();
  },
};
</script>
<template>
  <div
    class="m-auto mb-20 container max-w-md p-3 my-auto mt-24 bg-white border-2 border-gray-200 rounded-md"
  >
    <div class="my-6 text-center">
      <h1 class="text-3xl font-semibold text-gray-700">Sign in</h1>
      <p class="text-gray-500">Sign in to access your account</p>
    </div>
    <div class="m-6">
      <form @submit.prevent="login(credentials)" class="mb-4">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
            >Email Address</label
          >
          <input
            v-model="credentials.email"
            type="email"
            name="email"
            id="email"
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
            v-model="credentials.password"
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="w-full px-3 py-4 text-white duration-100 ease-in-out bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Sign in
          </button>
        </div>
        <p class="text-sm text-center text-gray-400">
          Don&#x27;t have an account yet?
          <router-link
            to="/register"
            class="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline"
            >Register</router-link
          >.
        </p>
      </form>
      <div class="flex flex-row justify-center mb-8">
        <span class="absolute px-4 text-gray-400 bg-white"
          >or sign in with</span
        >
      </div>
      <div class="flex flex-row gap-2">
        <div class="flex justify-center w-full">
          <div id="customBtn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#top-login {
  margin-top: 5rem;
}
</style>
