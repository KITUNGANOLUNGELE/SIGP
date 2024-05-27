import { defineStore } from "pinia";
import axios from "axios";
export const useProvN = defineStore("uProvN", {
  state: () => ({
    province: [],
  }),
  getters: {},
  actions: {
    async getprovince(s) {
      let v = new FormData();
      v.append("nom", s.nom);
      let data = await axios.post(
        "http://localhost:8888/sigp/province/get/all?user=hibaigle&mdp=mdp",
        v
      );
      return data;
    },
  },
});
