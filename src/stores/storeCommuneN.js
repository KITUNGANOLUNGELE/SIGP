import { defineStore } from "pinia";
import axios from "axios";
export const useCommuneN = defineStore("uCommuneN", {
  state: () => ({
    commune: [],
  }),
  getters: {},
  actions: {
    async getcommune() {
      let data = await axios.get(
        "http://localhost/sigp/commune/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});
