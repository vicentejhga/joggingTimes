

class api {
    constructor() {
        this.token = ''
    }


    // USER 

    authenticate( email, password ) {
        return axios.post( apiUrl + 'auth/',{ 'email': email, 'password': password })
            .then(response => {
                    this.token = response.data.data.token;
                    console.log(  this.token );
                    axios.defaults.headers.common['Authorization'] = 'JWT ' + this.token;
                    return response.data.data.userId;           
            })
           
    }

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
 
