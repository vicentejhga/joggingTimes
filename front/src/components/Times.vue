
<template>
  	<div class="loginForm">
    <h1>Times</h1>
        <table>
          <thead>
              <tr>
                  <th> Date </th>
                  <th> Time </th>
                  <th> Distance </th>
                  <th> Average Speed </th>
                  <th>  </th>
              </tr>
          </thead>
          <tbody>
            <tr>
                <td> <input type="date" v-model="formNewTime.date"/> </td>
                <td> <input type="text" v-model="formNewTime.time"/> </td>
                <td> <input type="number" v-model="formNewTime.distance"/> </td>
                <td>  </td>
                <td>  </td>
                <td> <button v-on:click="addTime">add</button></td>
            </tr>
            <tr v-for="row in arrTimes">
                <td> {{ row.date }} </td>
                <td> {{ row.time }} </td>
                <td> {{ row.distance }} </td>
                <td> </td>
                <td> <button v-on:click="editTime">edit</button> </td>
                <td> 
                      
                      <button v-on:click="deleteTime">delete</button>
                </td>
            </tr>
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
          editing:false,
          ownerTimes:'',
          formNewTime:{'date':'','distance':'','time':''},
          arrTimes: []  
      }
  },
  created: function(){
     api.getTimes(this)
  },

  methods: {
  		addTime:function() {    
  			 api.createNewTime(this, this.formNewTime);
  		},
      deleteTime:function() { 
          api.deleteTime(this, this.formNewTime);
      },
      editTime:function() {
          api.updateTime(this, this.formNewTime);
      }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
    margin-left:auto; 
    margin-right:auto;
}
   .edit {
      display: none;
    }
    .editing .edit {
      display: block
    }
</style>
