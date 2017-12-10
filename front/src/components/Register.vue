<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Register Form</h1>

                <form @submit.prevent="register(user)">
                    <div class="text-left">
                        <div class="form-group" :class="{ 'has-error': errors.name.length }">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Your name" v-model="user.firstName">
                            <p class="help-block" v-for="error in errors.name">{{ error }}</p>
                        </div>

                         <div class="form-group" :class="{ 'has-error': errors.surname.length }">
                            <label for="surname">Surname</label>
                            <input type="text" class="form-control" id="surname" placeholder="Your surname" v-model="user.lastName">
                            <p class="help-block" v-for="error in errors.surname">{{ error }}</p>
                        </div>

                        <div class="form-group" :class="{ 'has-error': errors.email.length }">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Your email" v-model="user.email">
                            <p class="help-block" v-for="error in errors.email">{{ error }}</p>
                        </div>

                        <div class="form-group" :class="{ 'has-error': errors.password.length }">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Your password" v-model="user.password">
                            <p class="help-block" v-for="error in errors.password">{{ error }}</p>
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
    export default {
        data() {
            return {
                user: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    password: null
                },
                errors: {
                    name: [],
                    surname: [],
                    email: [],
                    password: []
                },
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
                axios.post(API.auth, user)
                    .then(response => {
                        this.resetUser()
                        let successMessage = response.data.message                   
                    })
                    .catch(error => {
                        let data = error.response.data       
                        for(let key in this.errors) {
                            // reset all errors
                            this.errors[key] = []

                            let errorMessage = data[key]

                            if(errorMessage)
                                this.errors[key] = errorMessage
                        }
                    })
            }
        },
    }
</script>