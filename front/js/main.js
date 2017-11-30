

var app = new Vue({
  	el: '#app',
  	data: {
  		user: new user()
  		time: new time();
  	},
  	methods: {
    	submitLogin: function(){ 
    		this.user.authenticate( )
    			.then( ()=> this.time.getAll( user.id ) )
    	}
	}
})