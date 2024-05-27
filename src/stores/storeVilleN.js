import { defineStore } from "pinia";
import axios from "axios";
export const useVilleN = defineStore("uVilleN", {
  state: () => ({
    ville: [],
  }),
  getters: {},
  actions: {
    async getville() {
      let data = await axios.get(
        "http://localhost/sigp/ville/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
  },
  async saveville(v){
    let d = new FormData();
    d.append("nom_ville",v.nom_ville)
    let data = await axios.post("http://localhost:8888/sigp/ville/save?user=hibaigle&mdp=mdp",d);
    return data;
  }

});
