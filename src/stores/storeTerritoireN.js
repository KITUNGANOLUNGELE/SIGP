import { defineStore } from "pinia";
import axios from "axios";
export const useTerriN = defineStore("uTerriN", {
  state: () => ({
    territoire: [],
  }),
  getters: {},
  actions: {
    async getterritoire() {
      let data = await axios.get(
        "http://localhost/sigp/territoire/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
    async getFromPRov(s){
        let f = new FormData();
        f.append("id_province", s.id_province);
        let data = await axios.post("http://localhost/sigp/territoire/get/province?user=hibaigle&mdp=mdp",f)
        return data.data
    }
  },
});
