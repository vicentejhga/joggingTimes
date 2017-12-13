<template>
    <div>
  		  <p class="danger" > {{this.error}}</p>
        <h1>Users</h1>
        <form @submit.prevent="addUser( )"">
		        <input type="text" v-model="formNewUser.firstName" placeholder="Name"/> 
      	    <input type="text" v-model="formNewUser.lastName" placeholder="Surname"/> 
      	    <input type="email" v-model="formNewUser.email" placeholder="E-mail"/> 
            <input type="password" v-model="formNewUser.password" placeholder="Password" /> 
            <button class="btn btn-primary" >Create User</button>
	      </form> 
       
        <table class="table table-striped">
            <thead>
               	<tr>
                    <th> First name </th>
                    <th> Last name </th>
                    <th> E-mail </th>
                    <th> Role </th>
                    <th></th>
                </tr> 
            </thead>
            <tbody>     
                <tr v-for="row in this.arrUsers" >
                    <template v-if ="editing == row" >
                        <td><input type="text" v-model = "row.firstName" /></td>
                        <td><input type="text" v-model = "row.lastName" /></td>
                        <td><input type="email" v-model = "row.email" /></td>
                        <td> {{ row.role }} </td>                 
                        <td>
                        	  <button @click="updateUser(row)" class="btn btn-primary">Save</button>
                        	  <button @click="refreshTable" class="btn btn-secondary">Cancel</button>
                        </td>    
                    </template>
                    <template v-else>
                        <td> {{ row.firstName }}  </td>
                        <td> {{ row.lastName }} </td>
                        <td> {{ row.email }} </td>
                        <td> {{ row.role }} </td> 
                        <td v-if="deleting==row">
                            Sure?
                        	  <button @click="deleteUser" class="btn btn-danger">Delete</button>
                        	  <button @click="refreshTable" class="btn btn-secondary">Cancel</button>
                        </td>
                        <td v-else>
                            <button @click="editing=row" class="btn btn-info">Edit</button>
                        	  <button @click="deleting=row" class="btn btn-danger">Delete</button>
                        	  <button  @click="redirectUserTimes(row)" class="btn btn-secondary" v-if="role=='Admin'">Times</button>
                        </td>   
                    </template>             
                </tr>
            </tbody>
        </table>
  	</div>
</template>

<script>
    import router from '../router/index'

    export default {
      	data () {
          	return {
           			arrUsers: [],
           			formNewUser:{ 'firstName':'','lastName':'','email':'','password':''},
           			error:'',
           			editing: null,
           			deleting: null,
                role: Store.state.currentUser.role
    		    } 
    	  },

     	  created: function() {   
            return axios.get( API.users )      
        		    .then( ( response ) => {
    				        this.arrUsers = response.data.data;
    			 	        this.error = '';
    	          })
    	         .catch(( err )=> {
    	              this.error = err.msg;
    	         });
     	  },

       	methods:{
      	 	  addUser:function(  ){
      	 		    let objParams = {
                    'firstName':this.formNewUser.firstName,
                    'lastName':this.formNewUser.lastName,
                    'email':this.formNewUser.email, 
                    'password':this.formNewUser.password  
                };

      	        axios.post( API.users, objParams )
              		  .then( this.refreshTable )
              		  .catch(( err )=> {			        	
      		              this.error = err.response.data.message;			    
      		          });
      	 	  },

        	 	refreshTable:function() {
          			this.editing = null;
           			this.deleting = null;
                this.error = '';
          	 		
                axios.get( API.users )   
          	    		.then( ( response ) => {
          	    			  this.formNewUser = { 
          					    				'firstName':'',
          					    				'lastName':'',
          					    				'email':'',
          					    				'password':''
          					    };

            	    			this.arrUsers = response.data.data;
            	    			this.error = '';
          		      })
          		      .catch(( err )=> {			        	
          		          this.error = err.response.data.message;			    
          		      });
        	 	},

        	 	updateUser:function( objUser ) { 		
        			  axios.put( API.users + objUser._id,  objUser )
        	 			    .then( this.refreshTable )
                		.catch(( err )=> {	
                    console.log(err);	
                        this.error = err.response.data.message;			    
        		        });
        	 	},

        	 	deleteUser:function(){
        	 		  axios.delete( API.users + this.deleting._id )
         		 		    .then( this.refreshTable )
        		        .catch(( err )=> {			        	
        		            this.error = err.response.data.message;			    
        		        });
        	 	},

        	 	redirectUserTimes:function( objUser ) {
                Store.dispatch('setUserToModify', objUser);
        	 		  router.push('/times/'+ objUser._id);
        	 	}
        }
    }
</script>

<style scoped>
 	td { min-width: 200px; }
	input { text-align: center; }
	form { margin-bottom: 20px;	 }
</style> 