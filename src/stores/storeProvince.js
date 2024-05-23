import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
export const useStoreProvince= defineStore("store",{
  state:()=>({
  provinces:[],
  message:[],
  pays:[]
  }),
  getters:{
    getProvince(state){
      return state.provinces.length;
    }

  },
  actions:{
    async afficherProvince(){
      try{
        const url='https://sigp2023.hibaigle.net/province/get/?user=hibaigle&mdp=mdp';
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
          this.provinces=rest.data.response;
          console.log(this.provinces)
      }catch (err){
console.log(err);
      }
    },
    async ajoutProvince(nomProvince,pays){
      try {
        const datas=new FormData();
        datas.append('nom_province',nomProvince)
        datas.append('id_pays',pays)
        const url='https://sigp2023.hibaigle.net/province/save/?user=hibaigle&mdp=mdp';
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
          this.pays = rest.data.response;
          console.log(this.pays);
          return this.pays;
         
      }catch (err){
console.log(err);
return err
      }
    }
   
  }
})
