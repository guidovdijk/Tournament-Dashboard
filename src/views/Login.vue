<template>
<div class="columns is-centered">
  <div class="column is-4">
    <LoginForm />
  </div>
</div>
</template>

<script>
import LoginForm from "../components/forms/Login.vue";
export default {
  name: "Login",
  components: {
    LoginForm
  }
}
</script>