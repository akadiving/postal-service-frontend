import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
  },
  mutations: {
    updateStorage(state, {access, refresh}) {
      state.accessToken = access
      state.refreshToken = refresh
    }
  },
  actions: {
    userLogin(context, userCredentials){
      axios.post('http://127.0.0.1:8000/api/token', {
        email: userCredentials.email,
        password: userCredentials.password
      })
      .then((response)=>{
        context.commit('updateStorage', {
          access: response.data.access,
          refresh: response.data.refresh
        })
      })
    },
  },
  modules: {},
});
