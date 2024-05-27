import { defineStore } from "pinia";
import axios from "axios";
export const useVilleN = defineStore("uVilleN", {
  state: () => ({
    ville: [],
  }),
  getters: {},
  actions: {
    async getville() {
      let data = await axios.get(
        "http://localhost/sigp/ville/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});
