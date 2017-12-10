<template>
	  <div v-if="this.$route.path!='/'&&this.$route.path!='/register'">
	      <router-link class="btn btn-default" :to="{ name: 'Home' }" v-bind:class="{active:this.$route.path=='/home'}">
            Home
  	    </router-link>
  		  
        <router-link class="btn btn-default" :to="{ name: 'Times' }" v-bind:class="{active:this.$route.path=='/times'}">
            Times
  	    </router-link>
		  
        <router-link class="btn btn-default" :to="{ name: 'Users' }" v-bind:class="{active:this.$route.path=='/users'}" v-if="this.role=='Admin'||this.role=='Manager'">
            Users
  	    </router-link>

  	    <router-link class="btn btn-default" :to="{ name: 'Weekly' }" v-bind:class="{active:this.$route.path=='/weekly'}">
            Weekly report
  	    </router-link>

        <button class="btn btn-default" @click="logOut">Log out</button>
  	</div>
</template>

<script>
    import router from '../router/index'
    export default {
        name: 'menu',
        data() {
            return {
                role:Store.state.currentUser.role
            }
        },
        
        updated:function() {
            this.role = Store.state.currentUser.role;
        },
        
        methods:{
            logOut: function() {
                Store.dispatch('logout')
                          .then(()=>{ router.push('/'); })
                          .catch(response => {  
                              console.log( response );
                          })
          }
        }
    }
</script>
