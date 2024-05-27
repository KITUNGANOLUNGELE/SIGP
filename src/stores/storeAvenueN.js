import { defineStore } from "pinia";
import axios from "axios";
export const useAvenueN = defineStore("uAvenueN", {
  state: () => ({
    avenue: [],
  }),
  getters: {},
  actions: {
    async getavenue() {
      let data = await axios.get(
        "http://localhost/sigp/avenue/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});