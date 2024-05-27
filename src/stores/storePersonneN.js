import { defineStore } from "pinia";
import axios from "axios";

export const usePersonneN = defineStore("uPersN", {
  state: () => ({
    personne: null,
    pere : null,
    mere : null
  }),
  getters: {},
  actions: {
    async getpers(s) {
      let f = new FormData();
      f.append("nom", s.nom);
      f.append("postnom", s.postnom);
      f.append("prenom", s.prenom);
      f.append("date_naissance", s.date_naissance);
      f.append("sexe", s.sexe);
      f.append("lieu_naissance", s.lieu_naissance);
      f.append("num_maison", s.num_maison);
      let data = await axios.post(
        "http://localhost/sigp/personne/get_by_names/?user=hibaigle&mdp=mdp",
        f
      );
      return data;
    },
    setPere(s){
      this.pere = s
    },
    setMere(s){
      this.mere = s
    },

  },
});
