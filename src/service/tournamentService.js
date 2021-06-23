import axios from 'axios';
import { url } from '@/util/utils.js';

const state = {
  status: '',
  tournaments: null,
  tournamentError: null,
  tournament: null,
}

const getters = {
  status: state => state.status,
  tournaments: state => state.tournaments,
  tournament: state => state.tournament,
  tournamentError: state => state.tournamentError,
}

const actions = {
  async getTournaments({commit}){
    commit('tournaments_request');
    try {
      let res = await axios.get(url.tournaments)
      if (res.data.success) {
        const tournaments = res.data.tournaments;
        commit('tournaments_success', tournaments);
      }
      return res;
    } catch (err) {
      commit('tournaments_error', err);
    }
  },

  async getTournament({commit}, id){
    commit('tournaments_request');
    try {
      let res = await axios.get(url.tournaments + '/' + id);

      if (res.data.success) {
        const tournament = res.data.tournament;
        commit('tournament_success', tournament);
      }

      return res;
    } catch (err) {
      commit('tournaments_error', err);
    }
  },

  async createTournament({commit}, tournament){
    commit('tournaments_request');
    try {
      let res = await axios.post(url.tournaments, tournament)
      if (res.data.success) {
        commit('tournament_create_success');
      }
      return res;
    } catch (err) {
      commit('tournaments_error', err);
    }
  },

  async updateTournament({commit}, tournament){
    commit('tournaments_request');
    try {
      console.log('tournament: ', tournament);
      let res = await axios.put(url.tournaments + '/' + tournament._id, tournament)
      if (res.data.success) {
        commit('tournament_create_success');
      }
      return res;
    } catch (err) {
      commit('tournaments_error', err);
    }
  }
}

const mutations = {
  tournaments_request(){
    state.status = 'loading';
  },
  tournaments_success(state, tournaments){
    state.status = 'success';
    state.tournaments = tournaments;
  },
  tournament_success(state, tournament){
    state.status = 'success';
    state.tournament = tournament;
  },
  tournament_create_success(state){
    state.status = 'success';
  },
  tournaments_error(state, err){
    state.status = 'error';
    state.tournamentError = err.response.data.msg
    state.tournaments = null;
    state.tournament = null;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};