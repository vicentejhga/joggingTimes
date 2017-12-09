import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const Store = new Vuex.Store({
    plugins: [createPersistedState()],

    state: {
        tokens: {
            access_token: null,
            expires_in: null,
            refresh_token: null,
            token_type: null
        },
        currentUser: {
            name: null,
            email: null,
            role: null,
            id: null
        },
    },

    actions: {
        login(context, user) {
            return new Promise((resolve, reject) => {
                console.log('user', user)

                let data = {
                    email: user.email,
                    password: user.password,
                };

                axios.post(API.login, data)
                    .then(response => {
                        let responseData = response.data.data
                        let now = Date.now()

                        responseData.expires_in = responseData.expires_in + now

                    
                
                        context.commit('updateTokens', responseData)

                        resolve(response)
                    })
                    .catch(response => {
                        reject(response)
                    })
            })
        },
        weekly( context ) {
            return axios.get( apiUrl + 'times/weekly/' + this.state.currentUser.id );
        },

        getUser( context, id ) {
                console.log(API.users + id);
            return new Promise((resolve, reject) => {
                axios.get( API.users + id  )
                    .then(response => {
                        resolve(response);
                    })
                    .catch(response => {
                        console.log("erroring");
                        console.log( response );
                        reject(response)
                    })    
            })
        }
    },

    mutations: {
        updateTokens(state, tokens) {
            state.tokens = tokens
            axios.defaults.headers.common['Authorization'] = 'JWT ' + tokens.token;
        },
    }

})

export default Store
