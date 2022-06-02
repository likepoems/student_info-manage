import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // isLogin:false,
    userinfo:{
      username:"",
      power:'',
      number:'',
    },
    number:'185020087',
  },
  mutations: {
    getUser:(state,userinfo)=>{
      state.userinfo = userinfo
    },
    // getIsLogin(state){
    //   state.isLogin = false
    // }
  },
  actions: {

  },
  modules: {
  }
})
