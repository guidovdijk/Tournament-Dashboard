import Vue from 'vue'
import Vuex from 'vuex'
import playerService from '../service/playerService'
import tournamentService from '../service/tournamentService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playerService,
    tournamentService,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})