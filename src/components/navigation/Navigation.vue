<template>
  <b-navbar fixed-top>
      <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img
                  src="../../assets/images/curry_crew_logo.png"
                  alt="Curry Crew Logo"
              >
          </b-navbar-item>
      </template>
      <template #start>
          <b-navbar-item tag="router-link" :to="{ path: '/tournaments' }">
              Tournaments
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/all-players' }">
              All Players
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/records' }">
              Records
          </b-navbar-item>
      </template>

      <template #end>
          <b-navbar-item tag="a" @click="logoutAction">
              Sign out
          </b-navbar-item>
      </template>
  </b-navbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navigation",
  methods: {

    ...mapActions(['logout']),  
      
    logoutAction: function () {
      this.logout();
      this.$router.push({name: 'Login'})
    }
  }
}
</script>