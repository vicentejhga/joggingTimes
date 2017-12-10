<template>
    	<div class="loginForm">
			<router-link class="btn btn-default" :to="{ name: 'Home' }">
              Home
          	</router-link>
          		<router-link :key="$route.fullPath" class="btn btn-default" :to="{ name: 'Times' }">
              Times
          	</router-link>
 			<router-link class="btn btn-default" :to="{ name: 'Users' }">
              Users
          	</router-link>
        
          	<router-link class="btn btn-default" :to="{ name: 'Weekly' }">
              Weekly report
          	</router-link>

          	<router-link class="btn btn-default" :to="{ name: 'Register' }">
              Log out
          	</router-link>
    <h1>Times</h1>

    <form @submit.prevent="addTime( )"">
		<input type="date" v-model="formNewTime.firstName" placeholder="Name"/> 
      	<input type="text" v-model="formNewTime.lastName" placeholder="Time ( hh:mm:ss )"/> 
      	<input type="number" v-model="formNewTime.email" placeholder="Distance (Km)"/> 
        <button class="btn btn-primary" >Create Time</button>
	</form> 

     <label> Filter from:</label>
        <input type="date" class="bottomMargin" v-model="filterFrom" @change="updateDateFilter"/>

   <table class="table table-striped">
          <thead>
             	<tr>
                  <th> Date <sub>(dd/mm/aaaa)</sub></th>
                  <th> Time <sub>(hh:mm:ss)  </sub></th>
                  <th> Distance <sub>(Km)</sub></th>
                  <th> Average <sub>(Km/Hour)</sub></th>
                  <th>  </th>
            </tr> 
        </thead>
        <tbody>

          <tr v-for="row in this.arrTimes" >
              <!--    <template v-if ="idToEdit == row._id" > 
                    <td><input type="date" v-model = "formEditTime.date" /></td>
                    <td><input type="text" v-model = "formEditTime.time" /></td>
                    <td><input type="number" v-model = "formEditTime.distance" /></td>
                    <td></td>
                    <td> <button @click="editTime(formEditTime)">save</button> </td>
                    <td> <button @click="idToEdit=null">cancel</button> </td>
                </template>
                <template v-else>
                    <td> {{ dateFormat(row.date) }}  </td>
                    <td> {{ convertfromSecondsToHMS(row.time) }} </td>-->
                    <td> {{ row.distance }} </td>
                    <td> {{ row.average }} </td>  
                    <td> <button @click="updateEditing(row)">edit</button> </td>
                    <td> <button @click="deleteTime(row)">delete</button> </td>
               <!-- </template>-->
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
 			arrTimes: [],
 			formNewTime: {'date':'','time':'','distance':''},
 			error:'',
 			editing: null,
 			deleting: null,
      filterFrom: ''
		} 
	},
 	created: function() { 
 	console.log("creaetd");  
     	return this.refreshTable();

 	},


 	methods:{
 		addTime:function() {
			let objParams = {
								'date':this.formNewTime.date,
								'time':this.convertHMSToSeconds(this.formNewTime.time),
								'distance':this.formNewTime.distance
			  				};


	        axios.post( API.time, objParams )
	        	.then(()=> {
	        		this.formNewTime =  {'date':'','time':'','distance':''} 
	        	})
        		.then( this.refreshTable )
        		.catch(( err )=> {			        	
		            this.error = err.response.data.message;			    
		        });

 		},
    updateDateFilter:function() {

    },
 		convertfromSecondsToHMS:function( seconds ){
    		var date = new Date(null);
        	date.setSeconds(seconds); // specify value for SECONDS here
        	return date.toISOString().substr(11, 8);
      },
      convertHMSToSeconds:function( hms ){
           var a = hms.split(':'); // split it at the colons
         // minutes are worth 60 seconds. Hours are worth 60 minutes.
          return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
      },

	 	refreshTable:function(){
     	if ( typeof( this.$route.params.user ) != "undefined" ) {
        	var userId = this.$route.params.user;
        } else {
        	var userId = Store.state.currentUser.id;
        }

        return new Promise((resolve, reject) => {
        	console.log("INSIDEEEEE");
            axios.get( API.times + userId  )
                .then(response => {
                 this.arrTimes = response.data.data;
                })
                .catch(response => {
                    console.log(response);
                })    
        })


	 	}	
 	}
}



</script>
<style scoped>
 	td {
 		min-width: 200px;
	}

	input {
		text-align: center;
	}

	form {
		margin-bottom: 20px;	
	}
</style> 