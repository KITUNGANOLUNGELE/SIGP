import { defineStore } from "pinia";
import axios from "axios";
export const useCommuneN = defineStore("uCommuneN", {
  state: () => ({
    commune: [],
  }),
  getters: {},
  actions: {
    async getcommune() {
      let data = await axios.get(
        "https://hibaigle.000webhostapp.com/sigp/commune/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
    async getFromVille(s){
      let f = new FormData();
      f.append("id_ville", s.id_ville);
      let data = await axios.post("https://hibaigle.000webhostapp.com/sigp/commune/get/ville?user=hibaigle&mdp=mdp", f)
      return data.data
    }
  },
});
