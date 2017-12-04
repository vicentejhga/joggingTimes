<template>
  	<div class="loginForm">
      	<h1>Login</h1>
      	<input type = "text" placeholder="E-mail" />
      	<input type = "password" placeholder="Password" />
  		<button v-on:click="signIn">Sign in</button>
  	<div><p>New user? <a href="#/test">create new account</a></p></div>
  </div>
</template>



<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  		signIn:function() {
  			alert("ok");
  		}
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
