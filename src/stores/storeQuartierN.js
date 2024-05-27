import { defineStore } from "pinia";
import axios from "axios";
export const useQuartierN = defineStore("uQuartierN", {
  state: () => ({
    quartier: [],
  }),
  getters: {},
  actions: {
    async getquartier() {
      let data = await axios.get(
        "http://localhost:8888/sigp/quartier/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});
