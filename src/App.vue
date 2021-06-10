<template>
  <div id="app">
    <Navigation />
    <div class="container">
      <router-view/>
    </div>
    <Background />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Background from "./components/Background.vue";

export default {
  components: {
    Background,
    Navigation,
  }
}
</script>
