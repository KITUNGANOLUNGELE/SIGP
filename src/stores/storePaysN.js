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
        "http://localhost/sigp/pays/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
  async postpays(p){
    let d = new FormData();
    d.append("nom", p.nom);
    let data = await axios.post(
      "http://localhost/sigp/pays/save?user=hibaigle&mdp=mdp",
      d
    );
    return data;
  }
});
