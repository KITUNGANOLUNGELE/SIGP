import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
export const useStoreGroupement= defineStore("store",{
  state:()=>({
  groupements:[],
  message:[],
  }),
  getters:{
    getGroupement(state){
      return state.groupements.length;
    }

  },
  actions:{
    async afficherGroupement(){
      try{
        const url='https://sigp2023.hibaigle.net/groupement/get/?user=hibaigle&mdp=mdp';
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
          this.groupements=rest.data.response;
          console.log(this.groupements)
      }catch (err){
console.log(err);
      }
    },
    async ajoutGroupement(nomGroupement,province){
      try {
        const datas=new FormData();
        datas.append('nom_groupement',nomGroupement)
        datas.append('id_province',province)
        const url='https://sigp2023.hibaigle.net/groupement/save/?user=hibaigle&mdp=mdp';
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
