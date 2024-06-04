import { defineStore } from "pinia";
import axios from "axios";

export const usePersonneN = defineStore("uPersN", {
  state: () => ({
    personne: null,
    pere: null,
    mere: null,
    pere_tmp: null,
    mere_tmp: null,
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
    setPere(s) {
      this.pere = s;
      this.pere_tmp = s;
    },
    setMere(s) {
      this.mere = s;
      this.mere_tmp = s;
    },
    async save_PC(s) {
      console.log(s);
      let f = new FormData();
      f.append("nom", s.nom);
      f.append("postnom", s.postnom);
      f.append("prenom", s.prenom);
      f.append("lieu_naissance", s.lieu_naissance);
      f.append("date_naissance", s.date_naissance);
      f.append("sexe", s.sexe);
      f.append("id_partenaire", s.id_partenaire);
      f.append("couleur_oeil", s.couleur_oeil);
      f.append("id_groupement", s.id_groupement);
      f.append("id_avenue", s.id_avenue);
      f.append("num_maison", s.num_maison);
      let data = await axios.post(
        "http://localhost/sigp/personne/savePC?user=hibaigle&mdp=mdp",
        f
      );
      return data.data;
    },
    async buldActeNaiss(id){
      let form = new FormData();
      form.append("param", id);
      let res = await axios.post("http://localhost//sigp/personne/acte_naissance?user=hibaigle&mdp=mdp", form);
      console.log(res.data);
      return res.data
  }
  },
});
