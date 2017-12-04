import router from '../router/index'
let axios = require('axios');
let apiUrl = 'http://192.168.1.43:3000/';

export default {

    user: {
            token:''
    },

    login( context, credentials ) {  
        axios.post( apiUrl + 'auth/', credentials )
            .then(response => {
                    this.token = response.data.data.token;
                    axios.defaults.headers.common['Authorization'] = 'JWT ' + this.token;
                    console.log(context._data);
                    context.user.id = response.data.data.userId;
                    router.push('/times');          
            })
            .catch((err)=> {context.error = err.message});

    },

    createNewUser( context, userForm ) {

        axios.post( apiUrl + 'users/', userForm )
            .then( function(){
                router.push('/times');
            })
            .catch((err)=> {context.error = err.message});
    
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