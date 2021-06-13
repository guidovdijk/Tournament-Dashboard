<template>
  <b-navbar>
      <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '#' }">
              <img
                  src="../../assets/images/curry_crew_logo.png"
                  alt="Curry Crew Logo"
              >
          </b-navbar-item>
      </template>


      <template #end>
          <b-navbar-item tag="div">
            <a href="discord">
            Discord
            </a>
          </b-navbar-item>
          <b-navbar-item tag="div">
            <a href="instagram">
            Instagram
            </a>
          </b-navbar-item>
      </template>
  </b-navbar>
</template>

<script>
export default {
  name: "NoAccountNavigation"
}
</script>