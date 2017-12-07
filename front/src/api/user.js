var crypto = require('crypto');
let axios = require('axios');
let apiUrl = 'http://192.168.1.43:3000/';

import api from '../api'
import router from '../router'
export default {
  	
	id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',

	login( credentials ) {
		return api.login(  credentials )
        	.then( userId => this.getUser( userId ) )
        	.then( response => {
        			this.id = response.data.data._id;
        			this.firstName = response.data.data.firstName;
        			this.lastName = response.data.data.lastName;
        			this.email = response.data.data.email;
        			this.role = response.data.data.role;
        	}) 
	},

    createNewUser ( userForm ){
        return axios.post( apiUrl + 'users/', userForm );
    }, 



    updateUser( objUser ) {
        return axios.put( apiUrl + 'users/' + objUser._id,  objUser )
    },


    deleteUser( objUser ) {
        return axios.delete( apiUrl + 'users/' + objUser._id,  objUser )
    },



    getUser( userId = '') {
        return axios.get( apiUrl + 'users/' + userId  )       
    },

	logout() {
		api.logout(  ) 
		 	.then(() => router.push('/')) 
		 	.catch((err)=>{})
	}	
}


