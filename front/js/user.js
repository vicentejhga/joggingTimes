
let apiCall = new api();
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
		apiCall.authenticate( this.email, this.password )
			.then((userId) => apiCall.getUser(userId) )    	
        	.then(response => {
        		var objUser = response.data.data; 
				this.firstName = objUser.firstName;
		  		this.lastName = objUser.lastName;
		  		this.role = objUser.role;
		  		this.id = objUser._id;             
        	})
        	.catch(function (error) {
                console.log("error",error);
        	});
            	
    }



}
 
