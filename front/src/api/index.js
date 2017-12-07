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
            .then( () => { axios.defaults.headers.common['Authorization'] = '';  })
    }


}

