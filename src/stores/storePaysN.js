import { defineStore } from "pinia";
import axios from "axios";
export const usePaysN = defineStore("uPaysN", {
  state: () => ({
    pays: [],
  }),
  getters: {},
  actions: {
    async getpays() {
      let data = await axios.get(
        "http://localhost/sigp/pays/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});
