<template>
  	<div class="loginForm">
      	<h1>New user</h1>
      	<input type = "text" placeholder="First name" v-model="userForm.firstName"/>
        <input type = "text" placeholder="Last name" v-model="userForm.lastName" />
        <input type = "text" placeholder="E-mail" v-model="userForm.email"/>
      	<input type = "password" placeholder="Password" v-model="userForm.password"/>
  		  <button v-on:click="signUp">Create account</button>
    </div>
</template>

<script>

    import user from '../api/user.js'
    import router from '../router/index'

    export default {
        name: 'Register',
        data () {
        return {
            userForm: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            error: ''
        }
    },
    methods: {
        signUp: function() {
      			  user.createNewUser( this.userForm )
                  .then(() => { router.push('/'); })
                  .catch((err)=> {console.log(err)});
      		}
      }
    }
</script>

<style scoped>
    input {
        text-align: center;
        display:block;
        margin:0 auto;
        margin-bottom:10px;
    }
</style>