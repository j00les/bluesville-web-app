<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';

export default {
  components: { NavBar, Footer, HomeView, LoginView },
};
</script>

<template>
  <NavBar />

  <RouterView />
  <Footer />
</template>
