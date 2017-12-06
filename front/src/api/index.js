import router from '../router/index';

    var crypto = require('crypto');
let axios = require('axios');
let apiUrl = 'http://192.168.1.43:3000/';

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
        
        axios.post( apiUrl + 'auth/', credentials )
            .then(response => {
                    this.user.token = response.data.data.token;
                    axios.defaults.headers.common['Authorization'] = 'JWT ' +  this.user.token;
                    this.user.id = response.data.data.userId;         
                   
            })
            .then(() => this.getUser(this.user.id) )     
            .then(() => router.push('/times'))      
            .catch((err)=> {context.error = err.message});

    },

    logout() {
       
        var hash = crypto.createHash('sha256', 'supersecretbulletproofkey')
                   .update(this.user.token)
                   .digest('hex');
                  

        return axios.delete( apiUrl + 'auth/'+ hash ,{  })
            .then(response => {
                    axios.defaults.headers.common['Authorization'] = ''; 
                    let that = this;
                    Object.keys(this.user).forEach(function (prop) {
                        that[prop]='';
                    });                 
            })
    },

    createNewUser( context, userForm ) {
        axios.post( apiUrl + 'users/', userForm )
            .then( function(){
                router.push('/times');
            })
            .catch((err)=> {context.error = err.message});
    
    },
    
    // If not userId provided get all users
    getUser( userId ) {
        axios.get( apiUrl + 'users/' + userId, {} )
            .then(response => {          
                let objUser = response.data.data; 
                this.user.firstName = objUser.firstName;
                this.user.lastName = objUser.lastName;
                this.user.role = objUser.role;
                this.user.email = objUser.email;            
            })
            .catch((err)=> {context.error = err.message});

    },

    updateUser() {

    },

    deleteUser() {


    },

    createNewTime( newTimeForm ) {
        newTimeForm['userId'] = this.user.id;
        return axios.post( apiUrl + 'times/',  newTimeForm )
           
    },


    updateTime() {
        return axios.delete( apiUrl + 'times/' + objTime._id,  { 'userId': this.user.id })
   },

    deleteTime( objTime ) {
        return axios.delete( apiUrl + 'times/' + objTime._id,  { 'userId': this.user.id })
    },

    getTimes(   ) {
        return axios.get( apiUrl + 'times/' + this.user.id )
    },


    getWeeklyReports() {

    }

}

