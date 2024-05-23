import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
export const useStorePays= defineStore("store",{
  state:()=>({
  pays:[],
  lpays:[],
  message:[],
  }),
  getters:{
    getPaysNombre(state){
      return state.pays.length;
    }

  },
  actions:{
    async afficherPays(){
      try{
        const url='https://sigp2023.hibaigle.net/pays/get/?user=hibaigle&mdp=mdp';
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
        this.pays=rest.data.response;
          console.log(this.pays)
          for(var i=0; i<rest.data.response.length; i++){
            return this.lpays = rest.data.response[i].nom_pays;
          }
          return rest;
          // this.pays=rest.data.response;
      }catch (err){
console.log(err);
return lpays=rest.data.response(err)
      }
    },
    async ajoutPays(nomPays){
      try {
        const datas=new FormData();
        datas.append('nom_pays', nomPays);
        const url='https://sigp2023.hibaigle.net/pays/save/?user=hibaigle&mdp=mdp';
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
      } catch (error) {
        console.log(error);
      }
    },
   
  }
})
