<template>
<div class="columns is-centered">
  <div class="column is-5 is-4-desktop">
    <form class="box box--login" @submit.prevent="loginSubmit">
      <h3 class="title is-4">Login</h3>
      <b-field label="Email"
          message="">
          <b-input
            type="email"
            required
            v-model="loginFormData.email"
            placeholder="dr.mundoe@gmail.com...">
          </b-input>
      </b-field>
      <b-field label="Password">
      <b-input type="password"
        required
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
import { mapActions } from "vuex";

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
    ...mapActions(['login']),
    loginSubmit: function(){
      this.login(this.loginFormData)
        .then(res => {
          if (res.data.success) {
            this.$router.push({name: 'Home'});
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>