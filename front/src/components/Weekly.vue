<template>
  	<div>    
        <p class="danger" > {{this.error}}</p>
            <h1>Weekly report</h1>
       	<table class="table table-striped">
            <thead >
                <tr>
                	  <th>Week</th>
                    <th>Average speed <sub>(Km/Hours)</sub></th>
                    <th>Average distance <sub>(Km)</sub></th>
                </tr>
            </thead>
            <tbody>     
                <tr v-for="row in this.arrReport" >
                	  <td> {{getDateFromWeekNumber( row._id )}}</td>       
                    <td> {{Math.round(row.average*1000)/1000}}</td>
                    <td> {{Math.round(row.distance*1000)/1000}}</td>               
                </tr> 
            </tbody>
        </table> 
    </div>
</template>

<script>  
    import utility from '../utility/date.js'

    export default {
        name: 'Weekly', 
        data () {
            return {
               arrReport:[],
               utility: utility,
               error:''
            }  
        },

        created: function() {                
          axios.get( API.times + 'weekly/' + Store.state.currentUser.id )
              .then( ( response ) => {
					        this.arrReport = response.data.data;
	            })
	            .catch(( err )=> {
	                this.error = err.response.data.message;          
	            });
 		    },

     		methods: {
          	getDateFromWeekNumber: function( objDate ) {
        				var d = new Date("Jan 01, "+ objDate.year +" 01:00:00");
        				var w = d.getTime() + 604800000 * (objDate.week-1);
        				var n1 = this.utility.dateFormat( new Date(w)) ;
        				var n2 = this.utility.dateFormat( new Date(w + 518400000) );
        				return n1 + " to " + n2;
          	}
      	}
    }
</script>