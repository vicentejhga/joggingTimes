<template>
    <div >	
        <p class="danger" > {{this.error}}</p>
        <h1>Times</h1>

        <form @submit.prevent="addTime( )"">
    		    <input type="date" v-model="formNewTime.date" placeholder="Date"/> 
          	<input type="text" v-model="formNewTime.time" placeholder="Time ( hh:mm:ss )"/> 
          	<input type="number" v-model="formNewTime.distance" placeholder="Distance (Km)"/> 
            <button class="btn btn-primary" >Create Time</button>
	      </form> 
        <label> Filter from:</label>
        <input type="date" class="bottomMargin" v-model="filterFrom" @change="refreshTable"/>

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
                    <template v-if ="idToEdit == row._id" > 
                        <td><input type="date" v-model = "formEditTime.date" /></td>
                        <td><input type="text" v-model = "formEditTime.time" /></td>
                        <td><input type="number" v-model = "formEditTime.distance" /></td>
                        <td></td>
                        <td>  
                            <button @click="editTime" class="btn btn-primary">Save</button>
                            <button @click="idToEdit=null" class="btn btn-secondary">Cancel</button>
                        </td>
                    </template>
                    <template v-else>
                        <td> {{ utility.dateFormat(row.date) }}  </td>
                        <td> {{ utility.convertfromSecondsToHMS(row.time) }} </td>
                        <td> {{ row.distance }} </td>
                        <td> {{ Math.round(row.average*1000)/1000 }} </td>  
                        <td v-if="deleting==row"> 
                            <button @click="deleteTime(row)"  class="btn btn-danger">Delete</button>  
                            <button @click="deleting=null" class="btn btn-secondary">Cancel</button> 
                        </td>
                        <td v-else>
                            <button @click="prepareForEdition(row)" class="btn btn-info">Edit</button>
                            <button @click="deleting=row" class="btn btn-danger">Delete</button>
                        </td>                      
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import utility from '../utility/date.js'

    export default {
      	data () {
          	return {
       			arrTimes: [],
                formEditTime:{},
       			formNewTime: {'date':'','time':'','distance':''},
       			error:'',
                filterFrom: '',
                ownerId: '',
       			editing: null,
       			deleting: null,
                idToEdit: null, 
                utility: utility
    		    } 
    	},

     	created: function() { 
            if ( typeof( this.$route.params.user ) != "undefined" ) {
                this.ownerId = this.$route.params.user;
            } else {
                this.ownerId = Store.state.currentUser.id;
            }
       	   	return this.refreshTable();
       	},


       	methods:{
         	addTime:function() {
        		let objParams = {
						'date': this.formNewTime.date,
						'time': this.utility.convertHMSToSeconds(this.formNewTime.time),
						'distance': this.formNewTime.distance,
                        'userId': this.ownerId
        			  };
                   
      	        axios.post( API.times, objParams )
        	        	.then(()=> {
        	        		  this.formNewTime =  {'date':'','time':'','distance':''} 
        	        	})
                		.then( this.refreshTable )
                		.catch(( err )=> { this.error = err.response.data.message; });
            },

            deleteTime:function() {
                let id = this.deleting._id;
                this.deleting = null;  
                let obj = { 'userId': this.ownerTimes };    
                return axios.delete( API.times + id, { 'data':  obj})
                    .then(this.refreshTable)
                    .catch(( err )=>{ this.error = err.response.data.message; })  
         
            },

            editTime:function(){
                let obj = {
                    'date': this.formEditTime.date,
                    'distance': this.formEditTime.distance,
                    'time': this.utility.convertHMSToSeconds(this.formEditTime.time),
                    '_id': this.formEditTime._id,
                    'userId': this.formEditTime.userId,
                };
                
                this.idToEdit=null;
                    axios.put( API.times + obj._id,  obj )
                        .then(this.refreshTable)
                        .catch(( err )=> { this.error = err.response.data.message; })  
            },

            refreshTable:function(){
                this.error = '';
                return new Promise((resolve, reject) => {
                      axios.get( API.times + this.ownerId + '/' +  this.filterFrom)
                        .then(response => { this.arrTimes = response.data.data; })
                        .catch(err => { this.error = err.response.data.message; })    
                })
            },

            prepareForEdition:function( row ) {
                this.idToEdit = row._id;
                this.formEditTime = row;
                this.formEditTime.date = row.date.substr(0, 10);
                this.formEditTime.time = this.utility.convertfromSecondsToHMS(row.time);
                this.formEditTime.distance= row.distance;
                return this.refreshTable();        
            }  
        }
    }
</script>

<style scoped>
   	td { min-width: 200px; }
  	input { text-align: center; }
  	form { margin-bottom: 20px;	 }
</style> 