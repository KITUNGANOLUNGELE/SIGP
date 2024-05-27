import { defineStore } from "pinia";
import axios from "axios";
export const usePaysN = defineStore("uPaysN", {
  state: () => ({
    pays: [],
  }),
  getters: {},
  actions: {
    async getpays(s) {
      let y = new FormData();
      y.append("nom", s.nom);
      let data = await axios.post(
        "http://localhost:8888/sigp/pays/get/one?user=hibaigle&mdp=mdp",
        y
      );
      return data;
    },
  },
});
