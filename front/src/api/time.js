 
var crypto = require('crypto');
let axios = require('axios');
let apiUrl = 'http://192.168.1.43:3000/';


import api from '../api'
import router from '../router'
export default {
    arrTimes: [],  
    ownerTimes: '',
    from: '',

    setFrom( time ) { 
        this.from = time;
    },


    setOwner( id ) {
    	this.ownerTimes = id;
    },

    getTimes( ) {
        var params = { };
        if ( this.from !== '' ) { params['from'] = this.from; }
    	return axios.get( apiUrl + 'times/' + this.ownerTimes,params  )
          	.then( ( response ) => {
                this.arrTimes = response.data.data;
            }) 
    },

    createNewTime( date, time, distance ) {
    	let objParams = {'date':date,'distance':distance,'time':time, 'userId': this.ownerTimes};
    	return axios.post( apiUrl + 'times/',  objParams )        
    },


    deleteTime ( time ) {
        let obj = { 'userId': this.ownerTimes };
        
    	return axios.delete( apiUrl + 'times/' + time._id,  { 'data':  obj})
    },

    updateTime( objTime ) {
        return axios.put( apiUrl + 'times/' + objTime._id,  objTime )
   }


}


