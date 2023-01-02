<script>
import { mapActions, mapState } from 'pinia';
import { useProductStore } from '@/stores/product';
import { useUserStore } from '../stores/user';

export default {
  props: ['product', 'favorite'],

  methods: {
    ...mapActions(useProductStore, [
      'favoriteProduct',
      'getProductById',
      'toRupiah',
    ]),
    ...mapActions(useUserStore, ['loginCheck']),
  },

  computed: {
    ...mapState(useProductStore, ['productById']),
    ...mapState(useUserStore, ['isLoggedIn']),
  },

  created() {
    this.loginCheck();
  },
};
</script>
<template>
  <div class="w-56 shadow-xl card bg-base-100">
    <div id="img-container w-100">
      <router-link v-if="product" :to="`details/${product?.id}`">
        <img :src="product.imgCard" class="m-auto" />
      </router-link>
      <div v-if="favorite">
        <img :src="favorite.Product.imgCard" class="m-auto" />
      </div>
    </div>
    <div class="p-2 card-body">
      <div class="flex flex-col">
        <h2 class="justify-center text-sm text-center card-title">
          {{ product ? product.name : favorite.Product.name }}
        </h2>

        <div v-if="product" class="flex flex-row-reverse items-end">
          <span
            v-if="this.isLoggedIn"
            id="star"
            @click="favoriteProduct(product?.id)"
            class="material-symbols-outlined"
          >
            star
          </span>
          <p class="self-end text-center">{{ toRupiah(product?.price) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#star {
  cursor: pointer;
}
</style>
