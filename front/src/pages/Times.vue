<template>
  	<div class="loginForm">
    <h1>Times</h1>
      <label> Filter from:</label>
        <input type="date" class="bottomMargin" v-model="filterFrom" @change="updateDateFilter"/>
       <table>
          <thead>
              <tr>
                  <th> Date </th>
                  <th> Time </th>
                  <th> Distance </th>
                  <th> Average </th>
                  <th>  </th>
              </tr>
               <tr>
                <td> <input type="date" v-model="formNewTime.date"/> </td>
                <td> <input type="text" v-model="formNewTime.time"/> </td>
                <td> <input type="number" v-model="formNewTime.distance"/> </td>
                <td>  </td>
                <td>  </td>
                <td> <button v-on:click="addTime">add</button></td>
            </tr>
          </thead>
          <tbody>     
            <tr v-for="row in this.arrTimes" >
                  <template v-if ="editing == row" >
                    <td><input type="date" v-model = "row.date" /></td>
                    <td><input type="text" v-model = "row.time" /></td>
                    <td><input type="number" v-model = "row.distance" /></td>
                    <td></td>
                    <td> <button @click="editTime(row)">save</button> </td>
                    <td> <button @click="editing=null">cancel</button> </td>
                </template>
                <template v-else>
                    <td> {{ reverse(row.date) }}  </td>
                    <td> {{ row.time }} </td>
                    <td> {{ row.distance }} </td>
                    <td> {{ row.average }} </td>  
                    <td> <button @click="editing=row">edit</button> </td>
                    <td> <button @click="deleteTime(row)">delete</button> </td>
                </template>
            </tr>
          </tbody>
        </table>
  	</div>
</template>
 


<script>

import api from '../api'
import time from '../api/time.js'

export default { 
  name: 'Times',
  data () {
      return {     
          editing: null,
          formNewTime: {'date':'','time':'','distance':''},
          arrTimes: time.arrTimes,
          filterFrom: ''
      }
  },
  created: function(){
      time.getTimes()
      .then(()=>{  
        this.arrTimes = time.arrTimes;
        })
          .catch((err)=> { 
            console.log("errroring", err);
          });
  },

  methods: {
      reverse:( value ) => {return value.split('-').reverse().join('-');},

  		addTime:function() {
        let newTime = this.formNewTime;
       
        time.createNewTime( newTime.date, newTime.time, newTime.distance   ) 
            .then(() => time.getTimes() )
            .then(()=>{
                this.arrTimes = time.arrTimes;
                this.formNewTime = {'date':'','distance':'','time':''}
            })
            .catch(( error )=>{
                console.log(error);
            })        
      },


      deleteTime:function( selectedTime ) { 
          this.editing = null;  
          time.deleteTime( selectedTime )
              .then(() => time.getTimes() )
              .then( () =>   this.arrTimes = time.arrTimes )
              .catch(( error )=>{
                  console.log(error);
              })  
      },

      editTime:function( selectedTime ) {
         
          time.updateTime( selectedTime )
              .then(() => time.getTimes() )
              .then(()=> this.arrTimes = time.arrTimes )
              .catch(( error )=>{
                  console.log(error);
              })
    },


    updateDateFilter:function() {
        time.setFrom(  this.filterFrom );
        time.getTimes() 
              .then(()=> this.arrTimes = time.arrTimes )
              .catch(( error )=>{
                  console.log(error);
              })


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
