<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Background />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Background from './components/Background.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Background,
  }
}
</script>