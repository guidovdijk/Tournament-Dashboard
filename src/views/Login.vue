<template>
<div class="columns is-centered">
  <div class="column is-5 is-4-desktop">
    <form class="box box--login" @submit.prevent="login">
      <h3 class="title is-4">Login</h3>
      <b-field label="Email"
          message="">
          <b-input
            type="email"
            v-model="loginFormData.email"
            placeholder="dr.mundoe@gmail.com...">
          </b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password"
            placeholder="cle(a)ver-password..."
            v-model="loginFormData.password"
            password-reveal>
        </b-input>
      </b-field>
      <b-field grouped class="is-centered">
        <b-button tag="input"
          native-type="submit"
          value="Login"
          type="is-primary"
        />
        <p class="control">
          <span>or</span>
          <router-link to="/register" class="is-link">Sign up</router-link>
        </p>
      </b-field>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      loginFormData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login: function(){
      console.log(this.loginFormData);
    }
  }
}
</script>