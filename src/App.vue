<template>
  <div id="app">
    <template v-if="isLoggedIn">
      <Navigation />
    </template>
    <template v-else>
      <NoAccountNavigation />
    </template>
    <div class="container is-fluid">
      <router-view/>
    </div>
    <Background />
  </div>
</template>

<script>
import NoAccountNavigation from "./components/navigation/NoAccountNavigation.vue";
import Navigation from "./components/navigation/Navigation.vue";
import Background from "./components/Background.vue";
import store from './store/store';

export default {
  components: {
    Background,
    NoAccountNavigation,
    Navigation,
  },
  computed: {
    isLoggedIn: function(){
      return store.getters.isLoggedIn
    }
  }
}
</script>
