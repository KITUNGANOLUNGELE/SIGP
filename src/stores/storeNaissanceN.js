import { defineStore } from "pinia";
import axios from "axios";

export const useNaissanceN = defineStore("UnaissanceS", {
  state : ()=>({
    naissances : []
  }),
  actions : {
    async saveNaissance(s){
      let f = new FormData();
      f.append("id_enfant", s.id_enfant);
      f.append("id_pere", s.id_pere);
      f.append("id_mere", s.id_mere);
      f.append("couleur_oeil", s.couleur_oeil);
      let data = await axios.post("https://hibaigle.000webhostapp.com/sigp/naissance/save?user=hibaigle&mdp=mdp", f)
      return data.data
    }
  }
})
