import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios,axios)

export default new Vuex.Store({
  state: {
    courses:[]
    
  },

 
  mutations: {
    set_courses :(state,course) =>state.courses = course,
    
     deleteAll : (state ) => state.courses = [],
     delete_item:(state,item) => {
     const index = state.courses.findIndex(e => e.id === item);
      state.courses.splice(index, 1);
     },
     update123:(state,item) => {
        // state.courses.map(itemm =>{
        //   if(itemm.id === item.id){
        //       itemm =item 
        //   }
        // })
        const index = state.courses.findIndex(c => c.id === item.id)
        state.courses[index] = item

     }

   

  },
  actions: {
    loadData({commit}){
      axios.get('http://localhost:3000/haha')
      .then(res => res.data)
      
      .then( course => commit('set_courses', course))
      
    },
     create({state,commit}, data) {
     
       axios.post('http://localhost:3000/haha', data).then( res => {
        let auto = state.courses.concat([res.data])
         commit('set_courses', auto)
         
       });
      
   },
   delete1({commit},item){
     axios.delete(`http://localhost:3000/haha/${item.id}`).then(res => {
       res.data
       console.log(res.data)
     })
      commit('delete_item',item.id)  
     
   },
   update_data({commit},item){
     return new Promise((resolve,reject) => {
        axios.put(`http://localhost:3000/haha/${item.id}`, item) // item dc resolve .then 
        .then(res => {
         
        
          // console.log(res.data)
          commit('update123',res.data)
          
           resolve( res.data)
          
        })
        
        .catch(err => {
          reject(err)
        }) 
        
     })
     
   }

 
  },
  modules:{

  }
})
