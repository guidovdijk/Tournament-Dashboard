import Vue from 'vue'
import Vuex from 'vuex'
import playerService from '../service/playerService'
import tournamentService from '../service/tournamentService'
import teamService from '../service/teamService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playerService,
    tournamentService,
    teamService,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})