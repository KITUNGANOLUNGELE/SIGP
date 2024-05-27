import { defineStore } from "pinia";
import axios from "axios";
export const useProvN = defineStore("uProvN", {
  state: () => ({
    province: [],
  }),
  getters: {},
  actions: {
    async getprovince() {
      let data = await axios.get(
        "http://localhost/sigp/province/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});
