import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
export const useStoreCommune= defineStore("store",{
  state:()=>({
  communes:[],
  message:[],
  }),
  getters:{
    getCommunes(state){
      return state.communes.length;
    }

  },
  actions:{
    async afficherCommune(){
      try{
        const url='https://sigp2023.hibaigle.net/commune/get/?user=hibaigle&mdp=mdp';
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
          this.communes=rest.data.response;
          console.log(this.communes)
      }catch (err){
console.log(err);
      }
    },
    async ajoutCommune(nomCommune,ville){
      try {
        const datas=new FormData();
        datas.append('nom_commune',nomCommune)
        datas.append('id_ville',ville)
        const url='https://sigp2023.hibaigle.net/commune/save/?user=hibaigle&mdp=mdp';
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
