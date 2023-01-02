<script>
import { mapActions, mapState } from 'pinia';
import { useProductStore } from '../stores/product';

export default {
  data() {
    return {
      params: this.$route.params.productId,
      product: {},
    };
  },

  methods: {
    ...mapActions(useProductStore, ['getProductById', 'toRupiah']),
  },

  computed: {
    ...mapState(useProductStore, ['productById']),
  },

  async created() {
    await this.getProductById(this.params);
    this.product = this.productById;
  },
};
</script>
<template>
  <section class="grid grid-cols-2 px-4 py-6 mx-auto">
    <div class="mx-auto">
      <img class="max-w-sm" :src="product.imgUrl" alt="" />
    </div>
    <div>
      <h2 class="pb-2 text-2xl text-center border-b-2">
        {{ product.name }}
      </h2>
      <p class="pt-2">
        {{ product.description }}
      </p>

      <div>
        <p class="mt-2 text-center">Stock: {{ product.stock }}</p>
        <h2 class="mt-2 text-xl font-bold text-center">
          {{ toRupiah(product.price) }}
        </h2>
      </div>
      <div id="cont" class="mx-auto">
        <p class="mb-2">Scan to see detail :</p>

        <img :src="product.qrcode" alt="" />
      </div>
    </div>
  </section>
</template>
<style>
#cont {
  margin-top: 2rem;
  width: 40%;
}
</style>
