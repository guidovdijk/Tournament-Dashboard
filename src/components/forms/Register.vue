<template>
  <form class="box box--register">
    <h3 class="title is-4">Register</h3>
    <b-field label="Email"
        message="">
        <b-input
          type="email"
          placeholder="dr.mundoe@gmail.com...">
        </b-input>
    </b-field>
    <b-field label="Discord Name"
        message="">
        <b-input
          type="text"
          placeholder="dr.mundoe...">
        </b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password"
          value=""
          placeholder="cle(a)ver-password..."
          password-reveal>
      </b-input>
    </b-field>
    <b-field label="Re-Type Password">
      <b-input type="password"
          value=""
          placeholder="cle(a)ver-password..."
          password-reveal>
      </b-input>
    </b-field>
    <b-field grouped class="is-centered">
      <b-button tag="input"
        native-type="submit"
        value="Register"
        type="is-primary"
      />
      <p class="control">
        <span>or</span>
        <router-link to="/login" class="is-link">Go back to login</router-link>
      </p>
    </b-field>
  </form>
</template>

<script>
export default {
  name: "RegisterForm"
}
</script>
