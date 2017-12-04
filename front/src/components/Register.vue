<template>
  	<div class="loginForm">
      	<h1>New user</h1>
      	<input type = "text" placeholder="First name" />
        <input type = "text" placeholder="Second name" />
        <input type = "text" placeholder="E-mail" />
      	<input type = "password" placeholder="Password" />
  		  <button v-on:click="signIn">Create account</button>
  	
  </div>
</template>



<script>
export default {
  name: 'Register',
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
