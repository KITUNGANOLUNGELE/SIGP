import { defineStore } from "pinia";
import axios from "axios";
export const useAvenueN = defineStore("uAvenueN", {
  state: () => ({
    avenue: [],
  }),
  getters: {},
  actions: {
    async getavenue() {
      let data = await axios.get(
        "https://hibaigle.000webhostapp.com/sigp/avenue/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
    async getFromQuartier(s){
      let f = new FormData();
      f.append("id_quartier", s.id_quartier);
      let data = await axios.post("https://hibaigle.000webhostapp.com/sigp/avenue/get/quartier?user=hibaigle&mdp=mdp", f)
      return data.data
    }
  },
});
