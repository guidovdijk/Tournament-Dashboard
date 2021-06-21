import axios from 'axios';
import { url } from '@/util/utils.js';

const state = {
  token: localStorage.getItem('token') || '',
  player: {},
  status: '',
  error: null
}

const getters = {
  isLoggedIn: state => !!state.token,
  isAdmin: state => state.player.role == "admin",
  authState: state => state.status,
  player: state => state.player,
  error: state => state.error
}

const actions = {
  // Login Action
  async login({
    commit
  }, player) {
    commit('auth_request');
    try {
      let res = await axios.post(url.user + '/login', player)
      if (res.data.success) {
        const token = res.data.token;
        const player = res.data.player;
        // Store the token into the localstorage
        localStorage.setItem('token', token);
        // Set the axios defaults
        axios.defaults.headers.common['Authorization'] = token;
        
        commit('auth_success', {token, player});
      }
      return res;
    } catch (err) {
      commit('auth_error', err);
    }
  },

  // Logout the user
  async logout({
    commit
  }) {
    await localStorage.removeItem('token');
    commit('logout');
    delete axios.defaults.headers.common['Authorization'];

    return
  },

  // Get the user Profile
  async getProfile({
    commit
  }) {
    commit('profile_request');
    let res = await axios.get(url.user + '/profile')

    commit('player_profile', res.data.player)
    return res;
  },
}

const mutations = {
  auth_request(state) {
      state.error = null
      state.status = 'loading'
  },
  auth_success(state, {token, player}) {
    state.token = token
    state.player = player
    state.status = 'success'
    state.error = null
  },
  auth_error(state, err) {
      state.error = err.response.data.msg
  },
  register_request(state) {
      state.error = null
      state.status = 'loading'
  },
  register_success(state) {
      state.error = null
      state.status = 'success'
  },
  register_error(state, err) {
      state.error = err.response.data.msg
  },
  logout(state) {
      state.error = null
      state.status = ''
      state.token = ''
      state.player = ''
  },
  profile_request(state) {
      state.status = 'loading'
  },
  player_profile(state, player) {
      state.player = player
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};