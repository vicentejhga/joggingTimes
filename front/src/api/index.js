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
    

    login(  credentials ) {  
        
       return  axios.post( apiUrl + 'auth/', credentials )
            .then(response => {
                    this.user.token = response.data.data.token;
                    axios.defaults.headers.common['Authorization'] = 'JWT ' +  this.user.token;
                    this.user.id = response.data.data.userId;         
                   
            })
            .then(() => this.getUser(this.user.id) )     
            

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

    createNewUser(  userForm ) {
        return axios.post( apiUrl + 'users/', userForm );
        
    },
     
    // If not userId provided get all users
    getUser( userId ) {
        var id = ( typeof(userId)==="undefined") ?'':userId;  
        console.log("here we are");
        console.log(id);  
        console.log(axios.defaults.headers.common['Authorization']);
        return axios.get( apiUrl + 'users/' + id)         
    },

    updateUser() {

    },

    deleteUser() {


    },

    createNewTime( newTimeForm ) {
        newTimeForm['userId'] = this.user.id;
        return axios.post( apiUrl + 'times/',  newTimeForm )
           
    },


    updateTime( objTime ) {
        return axios.put( apiUrl + 'times/' + objTime._id,  objTime)
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

