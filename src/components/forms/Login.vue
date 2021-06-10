<template>
  <form class="box">
    <b-field label="Email"
        type="is-danger"
        message="This email is invalid">
        <b-input type="email"></b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password"
          value=""
          password-reveal>
      </b-input>
    </b-field>
  </form>
</template>

<script>
export default {
  name: "Login"
}
</script>
