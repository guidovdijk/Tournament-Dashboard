import axios from 'axios';
import { url } from '@/util/utils.js';

const state = {
  status: '',
  tournaments: null,
  tournamentError: null
}

const getters = {
  status: state => state.status,
  tournaments: state => state.tournaments,
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
  tournaments_error(state, err){
    state.status = 'error';
    state.tournamentError = err.response.data.msg
    state.tournaments = null;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};