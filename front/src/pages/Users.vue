
<template>
  	<div class="loginForm">
    <h1>Users</h1>
        <table>
          <thead>
              <tr>
                  <th> First name </th>
                  <th> Last name </th>
                  <th> Role </th>
                  <th> Role </th>
                  <th>  </th>
              </tr>      
          </thead>
          <tbody>
           
          </tbody>
        </table>
  	</div>
 
</template>
 


<script>

import api from '../api'

export default {
  name: 'Times',
  data () {
      return {
        
          editing:null,
          ownerTimes:'',
          formNewTime:{'date':'','distance':'','time':''},
          arrTimes: []  
      }
  },
  created: function(){
     let that = this;
      api.getUser()
          .then( function( response ){
                console.log(response)
            })
          .catch((err)=> {
            console.log("errroring", err);
          });
  },

  methods: {
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
    margin-left:auto; 
    margin-right:auto;
}
.bottomMargin{
  margin-bottom: 20px;
}

.right{
  float:right;
}
   .edit {
      display: none;
    }
    .editing .edit {
      display: block
    }
  

    input {
      text-align: center
    }
</style>
