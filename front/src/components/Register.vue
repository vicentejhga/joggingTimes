<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <p class="danger" > {{this.error}}</p>
                <h1>Register Form</h1>

                <form @submit.prevent="register(user)">
                    <div class="text-left">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Your name" v-model="user.firstName">                            
                        </div>

                         <div class="form-group" >
                            <label for="surname">Surname</label>
                            <input type="text" class="form-control" id="surname" placeholder="Your surname" v-model="user.lastName">                          
                        </div>

                        <div class="form-group" >
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Your email" v-model="user.email">                 
                        </div>

                        <div class="form-group" >
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Your password" v-model="user.password">
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="btn btn-primary">Register</button>
                        <router-link class="btn btn-default" :to="{ name: 'Login' }">
                            Login
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../router/index'
    export default {
        data() {
            return {
                user: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    password: null
                },
                error:''
            }
        },
        methods: {
            resetUser() {
                this.user = {
                    firstName: null,
                    lastName: null,
                    email: null,
                    password: null
                }
            },
            register(user) {
                axios.post(API.users, user)
                    .then(response => {
                         router.push('/');         
                    })
                    .catch(error => {
                        this.error=error.response.data.message ;                      
                    })
            }
        },
    }
</script>