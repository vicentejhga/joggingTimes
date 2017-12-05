

export default {

    user: {
            id:'',
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            token:'',
            role:''
    },

    login( context, credentials ) {  
     

    }


}















/*

class api {
    constructor() {
        this.token = ''
    }


    // USER 

    logOut(){
          return axios.delete( apiUrl + 'auth/'+this.token ,{  })
            .then(response => {
                    this.token = '';
                    axios.defaults.headers.common['Authorization'] = '';                       
            })
           
    }




    getUser( userId ) {
        return axios.get( apiUrl + 'users/' + userId, {} );

    }




    // TIME
    addTime( userId, objTime ) {

        return axios.post( apiUrl + 'times/',  {
                                                'userId': userId, 
                                                'date': objTime.date, 
                                                'distance': objTime.distance, 
                                                'time': objTime.time
                                                })
    }

    deleteTime( objTime ) {
        return axios.delete( apiUrl + 'times/' + objTime._id,  { 'userId':objTime.userId })
    }

    getAllTimes( userId ) {
        return axios.get( apiUrl + 'times/' + userId, {} )
    }
}
 
*/







/*

class user {
    constructor() {
   
        this.firstName = '',
  		this.lastName = '',
  		this.role = '',
    	this.email =  '',
    	this.password =  '',
    	this.id = ''
    }

    authenticate( ) {
		return apiCall.authenticate( this.email, this.password )
			.then((userId) => apiCall.getUser(userId) )    	
        	.then(response => {
                console.log(response);
        		let objUser = response.data.data; 
				this.firstName = objUser.firstName;
		  		this.lastName = objUser.lastName;
		  		this.role = objUser.role;
		  		this.id = objUser._id;             
        	})
            	
    }


    logOut( ) {
        return apiCall.logOut( this.email, this.password );              
    }

}
 
*/