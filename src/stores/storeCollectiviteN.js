import { defineStore } from "pinia";
import axios from "axios";
export const useColleN = defineStore("uColleN", {
  state: () => ({
    collectivite: [],
  }),
  getters: {},
  actions: {
    async getcollectivite() {
      let data = await axios.get(
        "http://localhost/sigp/collectivite/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});
