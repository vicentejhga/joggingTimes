
import api from '../api'
import router from '../router'
export default {
    arrTimes: [],  
    ownerTimes: '',
    setOwner( id ) {
    	this.ownerTimes = id;
    },
    getTimes( ) {
    	console.log("***************", this.ownerTimes );
        return api.getTimes( this.ownerTimes )
          .then( function( response ){
                this.arrTimes = response.data.data;
            })
    
    }




}


