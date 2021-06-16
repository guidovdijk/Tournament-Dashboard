<template>
<div class="columns is-centered">
  <div class="column is-5 is-4-desktop">
    <form class="box box--register" @submit.prevent="register">
      <h3 class="title is-4">Register</h3>
      <b-field label="Email"
          message="">
          <b-input
            type="email"
            required
            v-model="registerFormData.email"
            placeholder="dr.mundoe@gmail.com...">
          </b-input>
      </b-field>
      <b-field label="Discord Name"
          message="">
          <b-input
            type="text"
            required
            v-model="registerFormData.name"
            placeholder="dr.mundoe...">
          </b-input>
      </b-field>
      <b-field label="Password" :type="validatePassword ? 'is-danger' : ''" :message="validatePassword ? 'Password needs to be the same' : ''">
        <b-input type="password"
            required
            v-model="registerFormData.password"
            placeholder="cle(a)ver-password..."
            password-reveal>
        </b-input>
      </b-field>
      <b-field label="Re-Type Password">
        <b-input type="password"
            required
            v-model="registerFormData.retypePassword"
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
  </div>
</div>
</template>

<script>
import { url } from '@/util/utils.js';

export default {
  name: "Register",
  data(){
    return {
      registerFormData: {
        email: '',
        name: '',
        password: '',
        retypePassword: ''
      }
    }
  },
  computed: {
    validatePassword: function(){
      const { password, retypePassword } = this.registerFormData;

      return password !== retypePassword && retypePassword.length > 0 && password.length > 0;
    },
  },
  methods: {
    register: function(){
      console.log(url.players + '/register');
      this.axios.post(url.players + '/register', this.registerFormData).then(() => {
          this.$router.push({name: 'Login'});
        }).catch((error) => {
                console.log(error.response);
            })
    }
  }
}
</script>