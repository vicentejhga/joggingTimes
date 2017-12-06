import router from '../router/index';

var crypto = require('crypto');
let axios = require('axios');
let apiUrl = 'http://192.168.1.43:3000/';

export default {
    token:'',
     

    login(  credentials ) {         
       return  axios.post( apiUrl + 'auth/', credentials )
                .then(response => {
                    this.token = response.data.data.token;
                    axios.defaults.headers.common['Authorization'] = 'JWT ' +  this.token; 
                    return response.data.data.userId;
                })
    },

    logout() {
       
        var hash = crypto.createHash('sha256', 'supersecretbulletproofkey')
                   .update(this.token)
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
        return axios.get( apiUrl + 'users/' + userId )         
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

    getTimes( userId ) {
        return axios.get( apiUrl + 'times/' + userId )
    },


    getWeeklyReports() {

    }

}

