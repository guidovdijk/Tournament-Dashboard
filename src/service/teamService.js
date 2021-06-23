import axios from 'axios';
import { url } from '@/util/utils.js';

const state = {
  teamStatus: '',
  teams: null,
  teamError: null,
  team: null,
}

const getters = {
  teamStatus: state => state.teamStatus,
  teams: state => state.teams,
  team: state => state.team,
  teamError: state => state.teamError,
}

const actions = {

  async createTeams({commit}, teams){
    commit('teams_request');
    try {
      let res = await axios.post(url.teams, teams)
      if (res.data.success) {
        commit('team_create_success');
      }
      return res;
    } catch (err) {
      commit('teams_error', err);
    }
  },

  async addPlayer({commit}, payload){
    commit('teams_request');
    console.log('test', payload.player);
    try {
      let res = await axios.post(`${url.teams}/${payload.id}/player`, payload.player)
      if (res.data.success) {
        commit('team_create_success');
      }
      return res;
    } catch(err){
      commit('teams_error', err);
    }
  },

  async deletePlayer({commit}, payload){
    commit('teams_request');

    console.log(payload);
    try {
      let res = await axios.delete(`${url.teams}/${payload.id}/player/${payload.player._id}`)
      if (res.data.success) {
        commit('team_create_success');
      }
      return res;
    } catch(err){
      commit('teams_error', err);
    }
  }
}

const mutations = {
  teams_request(){
    state.teamStatus = 'loading';
  },
  teams_success(state, teams){
    state.teamStatus = 'success';
    state.teams = teams;
  },
  team_success(state, team){
    state.teamStatus = 'success';
    state.team = team;
  },
  team_create_success(state){
    state.teamStatus = 'success';
  },
  teams_error(state, err){
    state.teamStatus = 'error';
    state.teamError = err.response.data.msg
    state.teams = null;
    state.team = null;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};