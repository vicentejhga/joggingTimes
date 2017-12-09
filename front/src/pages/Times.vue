<template>
<div>
 <p class="danger" > {{this.error}}</p>
  	<div  v-bind:class="{ info: !yourOwn }">
    <div  v-if="!yourOwn">
      <h2>{{ownerInfo.email}} times</h2>
      </div>
    <div v-else>
        <h1>Your times</h1>
    </div>


      <label> Filter from:</label>
        <input type="date" class="bottomMargin" v-model="filterFrom" @change="updateDateFilter"/>
       <table>
          <thead>
              <tr>
                  <th> Date <sub>(dd/mm/aaaa)</sub></th>
                  <th> Time <sub>(hh:mm:ss)  </sub></th>
                  <th> Distance <sub>(Km)</sub></th>
                  <th> Average <sub>(Km/Hour)</sub></th>
                  <th>  </th>
              </tr>
               <tr>
                <td> <input type="date" v-model="formNewTime.date"/> </td>
                <td> <input type="text" v-model="formNewTime.time" placeholder="hh:mm:ss" /> </td>
                <td> <input type="number" v-model="formNewTime.distance"/> </td>
                <td>  </td>
                <td>  </td>
                <td> <button v-on:click="addTime">add</button></td>
            </tr>
          </thead>
          <tbody>      
            <tr v-for="row in this.arrTimes" >
                  <template v-if ="idToEdit == row._id" >
                    <td><input type="date" v-model = "formEditTime.date" /></td>
                    <td><input type="text" v-model = "formEditTime.time" /></td>
                    <td><input type="number" v-model = "formEditTime.distance" /></td>
                    <td></td>
                    <td> <button @click="editTime(formEditTime)">save</button> </td>
                    <td> <button @click="idToEdit=null">cancel</button> </td>
                </template>
                <template v-else>
                    <td> {{ dateFormat(row.date) }}  </td>
                    <td> {{ convertfromSecondsToHMS(row.time) }} </td>
                    <td> {{ row.distance }} </td>
                    <td> {{ row.average }} </td>  
                    <td> <button @click="updateEditing(row)">edit</button> </td>
                    <td> <button @click="deleteTime(row)">delete</button> </td>
                </template>
            </tr>
          </tbody>
        </table>
  	</div>
    </div>
</template>

<script>

import api from '../api'
import time from '../api/time.js'
import user from '../api/user.js'

export default { 
  name: 'Times',
  data () {
      return {  
          ownerInfo: {},   
          formEditTime:{},
          idToEdit: null,
          formNewTime: {'date':'','time':'','distance':''},
          arrTimes: time.arrTimes,
          filterFrom: '',
          yourOwn:true,
          error:''
      }
  },
  created: function(){
      user.getUser( time.ownerTimes )
          .then((response)=> { 
            this.ownerInfo = response.data.data;
            this.yourOwn = (this.ownerInfo._id == user.id)
          })
          .then( time.getTimes() )
          .then(() => { this.arrTimes = time.arrTimes; })
          .catch((err)=> { 
              this.error=err.message;
          });
  },
  mounted:function(){
    console.log("mounted");
  },
 updated:function(){
  console.log("updated");
 },

  methods: {
    updateEditing:function( row ) {
      this.idToEdit = row._id;
      this.formEditTime = row;
      this.formEditTime.date = row.date.substr(0, 10);
      this.formEditTime.time= this.convertfromSecondsToHMS(row.time);
      this.formEditTime.distance= row.distance;
    },
      dateFormat:function(value){
        return time.dateFormat(value);
      },
// From seconds to hh:mm:ss
 
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

  		addTime:function() {
          let newTime = this.formNewTime;
       
          time.createNewTime( newTime.date, this.convertHMSToSeconds(newTime.time), newTime.distance   ) 
              .then(() => time.getTimes() )
              .then(()=> {
                  this.arrTimes = time.arrTimes;
                  this.formNewTime = {'date':'','distance':'','time':''}
              })
              .catch(( err )=>{
                 this.error=err.message;
              })        
      },


      deleteTime:function( selectedTime ) { 
          this.editing = null;  
          time.deleteTime( selectedTime )
              .then(() => time.getTimes() )
              .then( () =>   this.arrTimes = time.arrTimes )
              .catch(( err )=>{
                  this.error=err.message;
              })  
      },

      editTime:function( selectedTime ) {
          selectedTime.time = this.convertHMSToSeconds( selectedTime.time);
          time.updateTime( selectedTime )
              .then(() => time.getTimes() )
              .then(()=> this.arrTimes = time.arrTimes )
              .catch(( err )=>{
                  this.error=err.message;
              })
    },


    updateDateFilter:function() {
        time.setFrom(  this.filterFrom );
        time.getTimes() 
              .then(()=> this.arrTimes = time.arrTimes )
              .catch(( err )=>{
                  this.error=err.message;
              })
    }
  }
}
</script>

<style scoped>
    table {
        margin-left:auto; 
        margin-right:auto;
    }
    .info {
        background-color: #ddd;
    }    
    .bottomMargin {
        margin-bottom: 20px;
    }

    .right {
        float:right;
    }

   .edit {
        display: none;
    }

    .danger {
        color:white;
        background-color: #dc3545;    
    }

    .editing .edit {
        display: block
    }
  
    input {
        text-align: center
    }
</style>
