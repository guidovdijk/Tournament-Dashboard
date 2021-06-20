import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import './assets/scss/app.scss'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store'

Vue.use(Buefy)
Vue.use(VueAxios, axios)

// Load the token from the localStorage
const token = localStorage.getItem("token");
// Is there is any token then we will simply append default axios authorization headers
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
