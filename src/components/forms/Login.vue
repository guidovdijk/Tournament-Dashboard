<template>
  <form class="box box--login">
    <b-field label="Email"
        message="">
        <b-input
          type="email"
          placeholder="dr.mundoe@gmail.com...">
        </b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password"
          value=""
          placeholder="cle(a)ver-password..."
          password-reveal>
      </b-input>
    </b-field>
    <b-button tag="input"
      native-type="submit"
      value="Login"
      type="is-primary"
    />
  </form>
</template>

<script>
export default {
  name: "LoginForm"
}
</script>
