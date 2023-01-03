import { defineStore } from 'pinia';
import axios from '../../apis/axios-instance';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    productById: {},
    favorites: [],
    qr: [],
  }),

  actions: {
    toRupiah(price) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(price);
    },

    async fetchProduct(query) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `/pub/products/${query ? query : ''}`,
        });

        this.products = data;
        this.router.push(query ? query : '');
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: 'error',
          title: '500 INTERNAL SERVER ERROR',
        });
      }
    },

    async favoriteProduct(id) {
      try {
        await axios({
          method: 'post',
          url: `/pub/favorites/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Product added to my favorite!',
        });
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: "It's on your favorite list!",
        });
      }
    },

    async getFavorites() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `/pub/favorites/`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        });

        this.favorites = data;
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'You are not authorized',
        });
      }
    },

    async getProductById(id) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `/pub/products/${id}`,
        });

        console.log(data, 'prod data');

        this.productById = data;
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '500 INTERNAL SERVER ERROR',
        });
      }
    },
  },
});
