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

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    registerError: [],
  }),

  actions: {
    async registerHandler(cred) {
      try {
        await axios({
          method: 'post',
          url: '/pub/register',
          data: {
            username: cred.username,
            email: cred.email,
            password: cred.password,
            phoneNumber: cred.phoneNumber,
          },
        });
        this.router.push('/login');

        Toast.fire({
          icon: 'success',
          title: `Register success!`,
        });
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: `${err.response.data.message}`,
        });
      }
    },

    async loginHandler(cred) {
      try {
        const { data } = await axios({
          method: 'post',
          url: '/pub/login/',
          data: {
            email: cred.email,
            password: cred.password,
          },
        });

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('name', data.name);

        this.isLoggedIn = true;
        this.router.push('/');

        Toast.fire({
          icon: 'success',
          title: 'Login Success!',
        });
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: 'Invalid Email or Password!',
        });
      }
    },

    async handleCredentialResponse(response) {
      const { credential } = response;
      try {
        const { data } = await axios({
          method: 'POST',
          url: '/pub/google-login',
          data: {
            credential,
          },
        });

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('name', data.name);

        this.router.push('/');
        this.isLoggedIn = true;
      } catch (err) {
        new Swal(
          "Whoops, can't login!",
          'please double check your email/password',
          'error'
        );
      }
    },

    async logoutHandler() {
      Swal.fire({
        title: 'Are You sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, please!',
      }).then(result => {
        if (result.isConfirmed) {
          Toast.fire({
            icon: 'success',
            title: 'Logout Success!',
          });
          localStorage.clear();
          this.router.push('/');
          this.isLoggedIn = false;
        }
      });
    },

    loginCheck() {
      if (localStorage.getItem('access_token')) {
        this.isLoggedIn = true;
      }
    },
  },
});
