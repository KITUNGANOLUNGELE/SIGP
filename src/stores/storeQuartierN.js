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
        "http://localhost/sigp/quartier/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
    async getFromCommune(s){
      let f = new FormData();
      f.append("id_commune", s.id_commune);
      let data = await axios.post("http://localhost/sigp/quartier/get/commune?user=hibaigle&mdp=mdp", f)
      return data.data
    }
  },
});
