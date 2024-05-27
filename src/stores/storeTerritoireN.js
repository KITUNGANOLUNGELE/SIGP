import { defineStore } from "pinia";
import axios from "axios";
export const useTerriN = defineStore("uTerriN", {
  state: () => ({
    territoire: [],
  }),
  getters: {},
  actions: {
    async getterritoire() {
      let data = await axios.get(
        "http://localhost/sigp/territoire/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
});
