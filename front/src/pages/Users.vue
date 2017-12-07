
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
               <tr>
                  <th> First name </th>
                  <th> Last name </th>
                  <th> E-mail </th>
                  <th> Role </th>
                  <th>  </th>
              </tr> 
          </thead>
          <tbody>     
            <tr v-for="row in this.arrUsers" >
                  <template v-if ="editing == row" >
                    <td><input type="text" v-model = "row.firstName" /></td>
                    <td><input type="text" v-model = "row.lastName" /></td>
                    <td><input type="email" v-model = "row.email" /></td>
                    <td> {{ row.role }} </td>
                    <td> <button @click="editUser(row)">save</button> </td>
                    <td> <button @click="editing=null">cancel</button> </td>
                </template>
                <template v-else>
                    <td> {{ row.firstName }}  </td>
                    <td> {{ row.lastName }} </td>
                    <td> {{ row.email }} </td>
                    <td> {{ row.role }} </td>  
                    <td> <button @click="editing=row">edit</button> </td>
                    <td> <button @click="deleteUser(row)">delete</button> </td>
                </template>
                <td> <button @click="deleteUser(row)" v-if="role=='Admin'">Times</button> </td>
            </tr>
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
        editing: null,
        formNewUser: {'firstName':'','lastName':'','email':'','password':''},
        arrUsers: []
        ,
        role: user.role
      }
  },
  created: function(){
     
      user.getUser()
          .then( ( response ) => this.arrUsers = response.data.data )
          .catch(( err )=> {
            console.log("errroring", err);
          });
  },


  methods: {
      addUser: function( ) {
        let newUser = this.formNewUser;
       
        user.createNewUser( newUser.firstName, newUser.lastName, newUser.email, newUser.password   ) 
           .then(() => user.getUser() )
              .then(( response ) => {
                this.arrUsers = response.data.data; 
                this.formNewUser = {'firstName':'','lastName':'','email':'','password':''}
              })
            .catch(( error )=>{
                console.log(error);
            })        
      },


      deleteUser:function( selectedUser ) { 
          this.editing = null;  
          user.deleteUser( selectedUser )
              .then(() => user.getUser() )
              .then(( response ) => this.arrUsers = response.data.data )
              .catch(( error )=>{
                  console.log(error);
              })  
      },

      editUser:function( selectedUser ) {
          this.editing = null;  
          user.updateUser( selectedUser )
              .then(() => user.getUser() )
              .then(( response ) => this.arrUsers = response.data.data )
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
