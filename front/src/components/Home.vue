<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Home</h1>
                <div class="text-center">
                    <router-link class="btn btn-default" :to="{ name: 'Times' }">
                        Times
                    </router-link>
                     <router-link class="btn btn-default" :to="{ name: 'Weekly' }">
                        Weekly report
                    </router-link>
                    <router-link class="btn btn-default" :to="{ name: 'Register' }">
                        Users
                    </router-link>
                    <router-link class="btn btn-default" :to="{ name: 'Register' }">
                        Log out
                    </router-link>

                </div>          
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    email: null,
                    password: null,
                },
                error:''
            }
        },
        methods: {
        
        },
    }
</script>
