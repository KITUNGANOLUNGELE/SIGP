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
        "https://hibaigle.000webhostapp.com/sigp/ville/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
    async saveville(v) {
      let d = new FormData();
      d.append("nom_ville", v.nom_ville);
      d.append("id_province", v.id_province);
      let data = await axios.post(
        "https://hibaigle.000webhostapp.com/sigp/ville/save?user=hibaigle&mdp=mdp",
        d
      );
      return data;
    },
    async getFromProvince(v) {
      let f = new FormData();
      f.append("id_province", v.id_province);
      let data = await axios.post(
        "https://hibaigle.000webhostapp.com/sigp/ville/get/prov?user=hibaigle&mdp=mdp",
        f
      );
      return data.data;
    },
  },
});
