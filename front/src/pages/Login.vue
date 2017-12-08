<template>
  	<div class="loginForm">   
        <p class="danger" > {{this.error}}</p>
        <h1>Login</h1>
      	<input type = "text" placeholder="E-mail" v-model="credentials.email"/>
      	<input type = "password" placeholder="Password" v-model="credentials.password"/>
  		  <button v-on:click="signIn" :disabled="!credentials.email.length||!credentials.password.length">Sign in</button>
  	    <div><p>New user? <a href="#/register">create new account</a></p></div>
    </div>
</template>


<script>
    import user from '../api/user.js'
    import time from '../api/time.js'
    import router from '../router/index'

    export default {
        name: 'Login', 
        data () {
            return {
                credentials:{ email: '', password: '' },
                error:''
            } 
        },

        methods: { 
            signIn() {
    
                user.login( this.credentials )
                    .then(() => { time.setOwner( user.id ); })
                    .then(() => router.push('/times'))    
                    .catch((err) => {
                        this.error=err.message;                                 
                    });    
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
.danger {
color:white;
background-color: #dc3545;
    
}
</style>