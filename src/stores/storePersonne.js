import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
export const useStorePartenaire= defineStore("store",{
  state:()=>({
  peronnes:[],
  message:[],
  }),
  getters:{
    getPersonne(state){
      return state.personnes.length;
    }

  },
  actions:{
        async ajouterPersonne(nom,postnom,prenom,date_naissance,sexe,lieu_naissance,id_partenaire,id_groupement,id_avenue,num_maison){
                try{
                    const datas=new FormData();
                    datas.append('nom',nom);
                    datas.append('postnom',postnom);
                    datas.append('prenom',prenom);
                    datas.append('date_naissance',date_naissance);
                    datas.append('sexe',sexe);
                    datas.append('lieu_naissance',lieu_naissance);
                    datas.append('id_partenaire',id_partenaire);
                    datas.append('id_groupement',id_groupement);
                    datas.append('id_avenue',id_avenue);
                    datas.append('num_maison',num_maison);
                    const url='https://sigp2023.hibaigle.net/personne/post/?user=hibaigle&mdp=mdp';
                    const rest=await axios({
                    method: 'post',
                    url: url,
                    params:{
                    user:"hibaigle",
                    mdp:"mdp"
                    },
                    headers: {
                    "Content-Type":"multipart/form-data"
                    },
                    data: datas
                    });
                    this.message=rest.data.response;
                    console.log(this.message)
                }catch(err){
                    console.log(err)
                }
            },
        }
    }
)