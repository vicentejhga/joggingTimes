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
        authenticated: false,
        currentUser: {
            name: null,
            surname: null,
            email: null,
            role: null,
            id: null
        } 
    },

    actions: {
        login(context, user) {
            return new Promise((resolve, reject) => {
                let data = {
                    email: user.email,
                    password: user.password,
                };

                axios.post(API.auth, data)
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
        logout(context) {
            context.commit('cleanState');
          
        },

        getUser( context, id ) {
            return new Promise((resolve, reject) => {
                axios.get( API.users + id  )
                    .then(response => {
                        let responseData = response.data.data
                        context.commit('updateUser', responseData);
                        resolve(response)
                    })
                    .catch(response => {
                        reject(response)
                    })    
            })
        }


    },

    mutations: {
        updateTokens(state, tokens) {
            state.tokens = tokens
            state.authenticated = true;
            axios.defaults.headers.common['Authorization'] = 'JWT ' + tokens.token;
        },
        updateUser(state, user) {
            state.currentUser.id = user._id;
            state.currentUser.name = user.firstName;
            state.currentUser.surname = user.lastName;
            state.currentUser.role = user.role;
            state.currentUser.email = user.email;
        } ,
        cleanState(state){
            state.authenticated = false;
        
        }
    }

})

export default Store
