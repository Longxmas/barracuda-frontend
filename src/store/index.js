import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';

import user from './user';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user']
});


export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
  },
  plugins: [vuexLocal.plugin]
})
