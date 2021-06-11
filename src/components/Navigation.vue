<template>
  <b-navbar>
      <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img
                  src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                  alt="Lightweight UI components for Vue.js based on Bulma"
              >
          </b-navbar-item>
      </template>
      <template #start>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              Home
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/tournaments' }">
              Tournaments
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/all-players' }">
              All Players
          </b-navbar-item>
      </template>

      <template #end>
          <b-navbar-item tag="div">
              <div class="buttons">
                  <a class="button is-primary">
                      <strong>Sign up</strong>
                  </a>
                  <a class="button is-light">
                      Log in
                  </a>
              </div>
          </b-navbar-item>
      </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navigation"
}
</script>