<template>
  	<div> 

  		    <h1>Weekly report</h1>
   
   	
   	<table  class="table">
          <thead>
              <tr>
              	  <th>Week</th>
                  <th> Average speed </th>
                  <th> Average distance </th>
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
    import time from '../api/time.js'
    export default {
        name: 'Weekly', 
        data () {
            return {
               arrReport:[]
            }  
        },

        created: function() { 
      		time.getWeeklyReport()
	          .then( ( response ) => { 
	          	console.log(response);
					this.arrReport = response.data.data;
	           })
	          .catch(( err )=> {
	            console.log("errroring", err);
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

    
    table {
        margin-left:auto; 
        margin-right:auto;
    }

    td {
    	width: 300px
    }
</style>