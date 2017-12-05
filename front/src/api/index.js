import router from '../router/index';
import user from './user';

let axios = require('axios');
let apiUrl = 'http://192.168.1.43:3000/';

export default {

    user: user.user,
    

    login( context, credentials ) {  
        
        axios.post( apiUrl + 'auth/', credentials )
            .then(response => {
                    this.token = response.data.data.token;
                    axios.defaults.headers.common['Authorization'] = 'JWT ' + this.token;
                    this.user.id = response.data.data.userId;         
                   
            })
            .then(() => this.getUser(this.user.id) )     
            .then(() => router.push('/times'))      
            .catch((err)=> {context.error = err.message});

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

    },

    deleteTime() {


    },

    getTimes(   ) {
     
        return axios.get( apiUrl + 'times/' + this.user.id )
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