
<template>
  	<div class="loginForm">
    <h1>Users</h1>
        <table>
          <thead>
              <tr>
                  <th> First name </th>
                  <th> Last name </th>
                  <th> E-mail </th>
                  <th> Password </th>
                  <th>  </th>
              </tr> 
               <tr>
                <td> <input type="text" v-model="formNewUser.firstName"/> </td>
                <td> <input type="text" v-model="formNewUser.lastName"/> </td>
                <td> <input type="email" v-model="formNewUser.email"/> </td>
                <td> <input type="password" v-model="formNewUser.password"/> </td>
                <td>  </td>
                <td> <button v-on:click="addUser">add</button></td>
            </tr>     
          </thead>
          <tbody>     
        <!--    <tr v-for="row in this.arrTimes" >
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
            </tr>-->
          
          </tbody>
        </table>
  	</div>
 
</template>
 


<script>

import user from '../api/user.js'

export default {
  name: 'Times',
  data () {
      return {
        formNewUser: {'firstName':'','lastName':'','email':'','password':''},
        arrUsers: []  
      }
  },
  created: function(){
     let that = this;
      user.getUser()
          .then( ( response ) => { this.arrUsers = response.data.data; })
          .catch((err)=> {
            console.log("errroring", err);
          });
  },


  methods: {
      addUser: function( ) {}
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
