
import api from '../api'
import router from '../router'
export default {
  	name: 'Header',
	id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',

	login( credentials ) {
		return api.login(  this.credentials )
        	.then( userId => api.getUser( userId ) )
        	.then(response=> {
        			this.id = response.data.data.id;
        			this.firstName = response.data.data.firstName;
        			this.lastName = response.data.data.lastName;
        			this.email = response.data.data.email;
        			this.role = response.data.data.role;

        	})
        	.then(() => router.push('/times'))      
  
	},
	redirect( path ) {
		router.push(path)
	},
	logout() {
		api.logout(  ) 
		 	.then(() => router.push('/')) 
		 	.catch((err)=>{})
	}	
}


