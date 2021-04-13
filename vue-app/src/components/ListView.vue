<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      total-rows="5000"
      :per-page="perPage"
      aria-controls="my-table"
      @change="getByOffset()"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</template>
<script>
import ApiData from "@/js/ApiData";
export default {
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      items: [],
    };
  },
  mounted() {
    console.log("results", ApiData);
    this.get();
  },
  methods: {
    async get() {
      this.data = new ApiData();
      this.items = await this.data.get();
    },
    async getByOffset() {
      let resp = await this.data.get();
      this.items = [...this.items, ...resp];
    },
  },
};
</script>
