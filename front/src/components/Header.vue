 <template> 
		<div class="nav" > 
			<ul id="menu" v-if="user.id.length > 0">
				<a href="#" @click="goToTimesPage()" ><li v-bind:class="{active:selected=='times'}">Times</li></a>
				<a href="#" @click="goToWeeklyReportPage()"><li v-bind:class="{active:selected=='weekly'}">Weekly report</li></a>
				<a href="#" @click="manageUsers()" v-if="user.role!='Normal'"><li v-bind:class="{active:selected=='users'}">Manage users</li></a>
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
        	user: user,
        	selected: 'times'
    	}  
	},
	methods: {
		redirect( path ) {
			router.push(path);

		},
		goToTimesPage( ){
			this.selected = 'times';
			time.setOwner(user.id);
			router.push('/times')
		},
		goToWeeklyReportPage( ){
		 	this.selected = 'weekly';
			router.push('/weekly')
		},
		manageUsers( ){
		 	this.selected = 'users';
			router.push('/users')
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
	#menu li.active {
		background:#3863a0;
		 
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
 

	#menu  a{
		font:bold 11px Arial, Helvetica, sans-serif;
		color:#FFF;
		text-decoration:none;
	}

</style>
