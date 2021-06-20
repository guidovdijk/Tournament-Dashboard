import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    component: () => import(/* webpackChunkName: "Tournaments" */ '../views/Tournaments.vue')
  },
  {
    path: '/tournaments/:id',
    name: 'TournamentDetails',
    component: () => import(/* webpackChunkName: "TournamentDetails" */ '../views/TournamentDetails.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      next('/');
    } else {
      next();
    }
  } else {
    next()
  }
});
export default router
