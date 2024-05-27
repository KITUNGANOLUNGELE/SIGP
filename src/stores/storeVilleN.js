import { defineStore } from "pinia";
import axios from "axios";
export const useVilleN = defineStore("uVilleN", {
  state: () => ({
    ville: [],
  }),
  getters: {},
  actions: {
    async getville(s) {
      let l = new FormData();
      l.append("nom", s.nom);
      let data = await axios.post(
        "http://localhost:8888/sigp/ville/get/all?user=hibaigle&mdp=mdp",
        l
      );
      return data;
    },
  },
});
