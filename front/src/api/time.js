 
var crypto = require('crypto');
let axios = require('axios');
let apiUrl = 'http://192.168.1.43:3000/';


import api from '../api'
import router from '../router'
export default {
    arrTimes: [],  
    ownerTimes: '',

 

    setOwner( id ) {
    	this.ownerTimes = id;
    },

    getTimes( ) {
    	return axios.get( apiUrl + 'times/' + this.ownerTimes )
          	.then( ( response ) => {
                this.arrTimes = response.data.data;
                console.log(this.arrTimes);
            }) 
    },

    createNewTime( date, time, distance ) {
    	let objParams = {'date':date,'distance':distance,'time':time, 'userId': this.ownerTimes};
    	return axios.post( apiUrl + 'times/',  objParams )        
    },

    deleteTime ( time ) {
    	return axios.delete( apiUrl + 'times/' + time._id,  { 'userId': this.ownerTimes })
    }




}


