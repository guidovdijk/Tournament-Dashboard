<template>
<div class="columns is-centered">
  <div class="column is-5 is-4-desktop">
    <RegisterForm />
  </div>
</div>
</template>

<script>
import RegisterForm from "../components/forms/Register.vue";
export default {
  name: "Register",
  components: {
    RegisterForm
  }
}
</script>