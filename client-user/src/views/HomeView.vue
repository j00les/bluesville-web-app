<script>
import { mapActions, mapState } from 'pinia';
import Carousel from '@/components/Carousel.vue';
import ProductCard from '@/components/ProductCard.vue';
import SideBar from '../components/SideBar.vue';
import { useProductStore } from '../stores/product';
import { useUserStore } from '../stores/user';

export default {
  data() {
    return {
      productData: [],
      search: '',
    };
  },

  components: { Carousel, ProductCard, SideBar },

  methods: {
    ...mapActions(useProductStore, ['fetchProduct']),
    ...mapActions(useUserStore, ['loginCheck']),

    getProduct(query) {
      this.fetchProduct(query);
    },
  },

  computed: {
    ...mapState(useProductStore, ['products']),
  },

  created() {
    //page
    if (this.$route.query['page[size]'] && this.$route.query['page[number]']) {
      this.getProduct(
        `?page[size]=${this.$route.query['page[size]']}&page[number]=${this.$route.query['page[number]']}`
      );
      //filter and search
    } else if (Object.keys(this.$route.query).length > 1) {
      this.getProduct(
        `?filter[category]=${this.$route.query['filter[category]']}&search=${this.$route.query.search}`
      );
      //search
    } else if (this.$route.query.search) {
      this.getProduct(`?search=${this.$route.query.search}`);
      //filter
    } else if (this.$route.query['filter[category]']) {
      this.getProduct(
        `?filter[category]=${this.$route.query['filter[category]']}`
      );
      //else
    } else {
      this.getProduct();
    }
    this.loginCheck();
  },
};
</script>

<template>
  <Carousel />
  <div class="flex flex-col mx-auto cont min-w-max">
    <section id="home-section" class="flex justify-center mb-20 mt-14">
      <SideBar @perform-query="getProduct" />

      <section class="text-right">
        <div class="justify-end mb-4 btn-group">
          <button
            class="btn"
            @click="
              fetchProduct(
                `?page[size]=9&page[number]=${
                  products.currentPage > 1
                    ? products.currentPage - 1
                    : (products.currentPage = 1)
                }`
              )
            "
          >
            prev
          </button>
          <button
            @click="fetchProduct(`?page[size]=9&page[number]=${+i}`)"
            v-for="i in products?.totalPages"
            class="btn"
          >
            {{ i }}
          </button>
          <button
            @click="
              fetchProduct(
                `?page[size]=9&page[number]=${
                  products.currentPage < Math.ceil(products.totalItems / 9)
                    ? products.currentPage + 1
                    : (products.currentPage = 1)
                }`
              )
            "
            class="btn"
          >
            next
          </button>
        </div>
        <div
          v-if="products.products"
          class="grid grid-cols-3 grid-rows-3 gap-6 mb-6"
        >
          <ProductCard
            v-for="product in products.products"
            :key="`card-${product.id}`"
            :product="product"
          />
        </div>
      </section>

      <div
        v-if="products?.products?.length === 0"
        class="my-auto text-xl text-center"
        id="no-prod"
      >
        <h2>There are no product yet.</h2>
      </div>
    </section>
  </div>
</template>

<style>
.cont {
  width: 2rem;
}

#no-prod {
  width: 45rem;
}
</style>
