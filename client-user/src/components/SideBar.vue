<script>
export default {
  data() {
    return {
      search: '',
      filter: '',
    };
  },

  methods: {
    performQuery() {
      if (this.search && this.filter) {
        this.$emit(
          'perform-query',
          `?filter[category]=${this.filter}&search=${this.search}`
        );
      } else if (this.search) {
        this.$emit('perform-query', `?search=${this.search}`);
      } else if (this.filter) {
        this.$emit('perform-query', `?filter[category]=${this.filter}`);
      }
    },

    clear() {
      //reset form
      this.$refs.clear.reset();
      this.search = this.filter = '';
      this.$emit('perform-query', `?page`);
    },
  },
};
</script>
<template>
  <!-- sidebar -->
  <div id="sidebar" class="mr-8">
    <form ref="clear" @submit.prevent="performQuery">
      <!-- filter -->
      <div id="radio">
        <div class="form-control">
          <span class="pb-3 font-bold uppercase text-l label-text"
            >filter by category
          </span>
          <label class="cursor-pointer label">
            <span class="uppercase label-text">Shirt</span>
            <input
              v-model="filter"
              value="1"
              type="radio"
              name="radio-6"
              class="radio checked:bg-red-500"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="uppercase label-text">T-Shirt</span>
            <input
              v-model="filter"
              value="2"
              type="radio"
              name="radio-6"
              class="radio checked:bg-blue-500"
            />
          </label>
        </div>

        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="uppercase label-text">Bottom</span>
            <input
              v-model="filter"
              value="3"
              type="radio"
              name="radio-6"
              class="radio checked:bg-green-500"
            />
          </label>
        </div>
      </div>
      <div id="search">
        <div class="w-full max-w-xs form-control">
          <label class="label">
            <span class="pt-4 pb-3 font-bold uppercase text-l label-text"
              >search product</span
            >
          </label>
          <input
            v-model="search"
            type="text"
            placeholder="Search here"
            class="w-full max-w-xs mb-4 input input-bordered"
          />
          <button type="submit" class="mb-2 btn">Search</button>
          <button @click="clear" type="button" class="btn">Clear</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style></style>
