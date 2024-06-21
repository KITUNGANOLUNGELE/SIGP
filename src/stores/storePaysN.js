import { defineStore } from "pinia";
import axios from "axios";
export const usePaysN = defineStore("uPaysN", {
  state: () => ({
    pays: [],
  }),
  getters: {},
  actions: {
    async getpays() {
      let data = await axios.get(
        "https://hibaigle.000webhostapp.com/sigp/pays/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
  async savePays(p){
    let d = new FormData();
    d.append("nom_pays", p.nom_pays);
    let data = await axios.post(
      "https://hibaigle.000webhostapp.com/sigp/pays/save?user=hibaigle&mdp=mdp",
      d
    );
    return data;
  }
});
