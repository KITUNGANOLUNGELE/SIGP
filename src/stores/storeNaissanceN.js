import { defineStore } from "pinia";
import axios from "axios";

export const useNaissance = defineStore("UnaissanceS", {
  state : ()=>({
    naissances : []
  }),
  getters : {
    async saveNaissance(s){
      let f = new FormData();
      f.append("id_enfant", s.id_enfant);
      f.append("id_pere", s.id_pere);
      f.append("id_mere", s.id_mere);
      f.append("couleur_oeil", s.couleur_oeil);
    }
  }
})
