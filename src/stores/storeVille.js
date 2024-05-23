import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
export const useStoreVille= defineStore("store",{
  state:()=>({
  villes:[],
  message:[],
  }),
  getters:{
    getVille(state){
      return state.villes.length;
    }

  },
  actions:{
    async afficherVille(){
      try{
        const url='https://sigp2023.hibaigle.net/ville/get/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"application/json"
        };
        const rest=await axios.get(url,headers,{
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          validateStatus: function(status){
            return status<500;
          },
        });
          this.villes=rest.data.response;
          console.log(this.villes)
      }catch (err){
console.log(err);
      }
    },
    async ajoutVille(nomVille,province){
      try {
        const datas=new FormData();
        datas.append('nom_ville',nomVille)
        datas.append('id_province',province)
        const url='https://sigp2023.hibaigle.net/ville/save/?user=hibaigle&mdp=mdp';
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
        console.log(datas)
      } catch (error) {
        console.log(error);
      }
    },
   
  }
})
