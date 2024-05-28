import { defineStore } from "pinia";
import axios from "axios";
export const useProvN = defineStore("uProvN", {
  state: () => ({
    province: [],
  }),
  getters: {},
  actions: {
    async getprovince() {
      let data = await axios.get(
        "http://localhost/sigp/province/get/all?user=hibaigle&mdp=mdp"
      );
      return data.data.response;
    },
    async getFromPays(s){
      let f = new FormData();
      f.append("id_pays", s.id_pays);
      let data = await axios.post("http://localhost/sigp/province/get/pays?user=hibaigle&mdp=mdp", f);
      return data.data
    }
  },
});
