var apiUrl = 'http://192.168.1.37:3000/';


class api {
    constructor() {
        this.token = ''
    }

    authenticate( email, password ) {
        return axios.post( apiUrl + 'auth/',{ 'email': email, 'password': password })
            .then(response => {
                    this.token = response.data.data.token;
                    return response.data.data.userId;           
            })
            .catch(function (error) {
                throw new Error( error );
            });
    }

    getUser( userId ) {
        let config = { headers: {'Authorization': "JWT " + this.token}};
        return axios.get( apiUrl + 'users/' + userId, config )

    }
}
 
