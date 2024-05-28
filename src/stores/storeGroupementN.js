import { defineStore } from "pinia";
import axios from "axios";
export const useGroupeN = defineStore("uGroupeN", {
  state: () => ({
    groupement: [],
  }),
  getters: {},
  actions: {
    async getgroupement() {
      let data = await axios.get(
        "http://localhost/sigp/groupement/get/all?user=hibaigle&mdp=mdp"
      );
      return data;
    },
    async getFromColl(s){
      let f = new FormData();
      f.append("id_collectivite", s.id_collectivite);
      let data = await axios.post("http://localhost/sigp/groupement/get/col?user=hibaigle&mdp=mdp",f)
      console.log(data);
      return data.data
  }
  },
});
