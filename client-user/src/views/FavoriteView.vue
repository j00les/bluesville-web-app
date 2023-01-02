<script>
import Carousel from '../components/Carousel.vue';
import { useProductStore } from '@/stores/product';
import { mapActions, mapState } from 'pinia';
import ProductCard from '../components/ProductCard.vue';

export default {
  data() {
    return {
      fav: [],
    };
  },
  components: { Carousel, ProductCard },
  methods: {
    ...mapActions(useProductStore, ['getFavorites']),
  },

  computed: {
    ...mapState(useProductStore, ['favorites']),
  },

  async created() {
    await this.getFavorites();
    this.fav = this.favorites;
  },
};
</script>

<template>
  <Carousel />
  <h2 class="my-6 text-2xl text-center">My Favorite</h2>
  <div class="flex mx-auto mb-6 w-fit">
    <div class="flex justify-center w-3/4 gap-3 mx-auto justify-evenly">
      <ProductCard v-for="favorite in fav" :favorite="favorite" />
    </div>
  </div>
</template>
<style></style>
