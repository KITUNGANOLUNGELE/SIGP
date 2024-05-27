import { defineStore } from "pinia";
import axios from "axios";
export const useTerriN = defineStore("uTerriN", {
  state: () => ({
    territoire: [],
  }),
  getters: {},
  actions: {
    async getterritoire(s) {
      let t = new FormData();
      t.append("nom", s.nom);
      let data = await axios.post(
        "http://localhost:8888/sigp/territoire/get/all?user=hibaigle&mdp=mdp",
        t
      );
      return data;
    },
  },
});
