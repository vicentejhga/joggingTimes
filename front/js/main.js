let apiCall = new api();
var apiUrl = 'http://192.168.1.37:3000/';


var app = new Vue({
  	el: '#app',
  	data: {
  		  user: new user(),
  		  time: new time()
  	},
  	methods: {
    	  submitLogin: function() { 
    		    this.user.authenticate( )
    			      .then( ()=> this.time.getAll( this.user.id ) )
                .catch(( error )=>{ console.log(error)})
    	  },
        logOut: function() {
            this.user.logOut( )
                .catch(( error )=>{ console.log(error)})
        },
        addRow:function() { 
            this.time.add( this.user.id )
                .catch(( error )=>{ console.log(error)})
        },
        removeRow:function( row ) {
            this.time.delete( row )
              .then(()=>row._id = '')
              .catch(( error )=>{ console.log(error)}) 
              
        } 
	  }
})