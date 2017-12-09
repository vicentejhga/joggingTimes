<template>
  	<div>    
        <p class="danger" > {{this.error}}</p>
        <h1>Weekly report</h1>
       	<table  class="table">
            <thead>
                <tr>
                	  <th>Week</th>
                    <th> Average speed <sub>(Km/Hours)</sub> </th>
                    <th> Average distance <sub>(Km)</sub></th>
                </tr>
            </thead>
            <tbody>     
                <tr v-for="row in this.arrReport" >
                	 <td > {{getDateFromWeekNumber( row._id )}} </td>       
                    <td> {{row.average}}  </td>
                    <td> {{row.distance}} </td>               
                </tr> 
            </tbody>
        </table> 
    </div>
</template>


<script>
   
    export default {
        name: 'Weekly', 
        data () {
            return {
               arrReport:[],
               error:''
            }  
        },

        created: function() { 
      	  Store.dispatch('weekly')
	          .then( ( response ) => { 
					      this.arrReport = response.data.data;
	          })
	          .catch(( err )=> {
	            this.error = err.msg;
	          });
 		},

 		methods: {
      		getDateFromWeekNumber: function( objDate ) {
      				var d = new Date("Jan 01, "+ objDate.year +" 01:00:00");
      				var w = d.getTime() + 604800000 * (objDate.week-1);
      				var n1 = time.dateFormat( new Date(w)) ;
      				var n2 = time.dateFormat( new Date(w + 518400000) );
      				return n1 + " to " + n2;
      		}
  		}
    }
</script>


<style scoped>   
    
  
</style>