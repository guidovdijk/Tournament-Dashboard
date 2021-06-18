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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
