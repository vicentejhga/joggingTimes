 var apiUrl = 'http://192.168.1.37:3000/';

var app = new Vue({
  el: '#app',
  data: {
    	email: '',
    	password: '',
    	token:'',
    	userId:''
  },
  methods: {
    	submitLogin: function () {
		 	axios.post(	apiUrl + 'auth/',{
		    		 		'email':this.email,
		    		 		'password':this.password
		    		 		})
		                    .then(response => {
		  	                  	this.token = response.data.data.token;
		  	                  	this.userId = response.data.data.userId;
		  	                  	console.log(this.token, this.userId);
		                	})
		                	.then( ()=>{
		                		 
		                		  var config = {
							        headers: {'Authorization': "JWT " + this.token}
							   		};
		                		return axios.get( apiUrl + 'users/' + userId, config)
		                	})
		                	.then(response => {
		                	 	console.log(response);
		                	})
		                	.catch(function (error) {
		                		console.log("something went wrong")
				                console.log(error);
				             });
    	}
	}
})