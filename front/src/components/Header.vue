 <template>
	<div class="nav" v-if="user.id.length > 0"> 
		<ul id="menu">
			<a href="#" @click="goToTimesPage()"><li>Times</li></a>
			<a href="#" @click="redirect('/weekly')"><li>Weekly report</li></a>
			<a href="#" @click="redirect('/users')" v-if="user.role!='Normal'"><li>{{ user.role }} stuff</li></a>
			<a href="#" @click="logout()"><li>Log out</li></a>
		</ul> 
	</div>

</template>

 

<script>

import user from '../api/user.js'
import time from '../api/time.js'
import api from '../api/'
import router from '../router'
export default {
  	name: 'Header',
   	data () {
    	return {
        	user: user
    	}  
	},
	methods: {
		redirect( path ) {
			router.push(path);

		},

		goToTimesPage( ){
			time.setOwner(user.id);
			this.redirect('/times')
		},
		logout() {
			api.logout(  ) 
				.then(() => { this.user.id = ''; } )
			 	.then(() => { router.push('/'); }) 
			 	.catch((err)=>{


			 	})
		}

	}
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	div.nav {
		overflow:auto;
	}

	#menu {
		width:500px;
		margin:0 auto;
	}

 	#menu li {
		float: left;
		display: inline;
		position: relative;
		margin:0 1px;
		width:98px;
		min-height:19px;
		text-align:center;
		background:#BBB;
		list-style:none;
		padding:2px 0;
	}

	#menu li:hover {
		background:#3863a0;
	}

	#menu  a{
		font:bold 11px Arial, Helvetica, sans-serif;
		color:#FFF;
		text-decoration:none;
	}

</style>
