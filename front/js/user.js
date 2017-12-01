

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
        		let objUser = response.data.data; 
				this.firstName = objUser.firstName;
		  		this.lastName = objUser.lastName;
		  		this.role = objUser.role;
		  		this.id = objUser._id;             
        	})
            	
    }



}
 
