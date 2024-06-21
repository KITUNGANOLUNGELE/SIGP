import { defineStore } from "pinia";
import axios from "axios";
export const useColleN = defineStore("uColleN", {
  state: () => ({
    collectivite: [],
  }),
  getters: {},
  actions: {
    async getcollectivite() {
      let data = await axios.get(
        "https://hibaigle.000webhostapp.com/sigp/collectivite/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
    async getFromTerr(s){
      let f = new FormData();
      f.append("id_territoire", s.id_territoire);
      let data = await axios.post("https://hibaigle.000webhostapp.com/sigp/collectivite/get/terr?user=hibaigle&mdp=mdp",f)
      return data.data
  }
  },
});
