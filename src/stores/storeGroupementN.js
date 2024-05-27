import { defineStore } from "pinia";
import axios from "axios";
export const useGroupeN = defineStore("uGroupeN", {
  state: () => ({
    groupement: [],
  }),
  getters: {},
  actions: {
    async getgroupement() {
      let data = await axios.get(
        "http://localhost/sigp/groupement/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});
