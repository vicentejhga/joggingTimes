
 
class time {
    constructor() {
  		this.date = '',
  		this.distance = '',
  		this.time = '',
  		this.average = ''
  		this.arrTimes = [];
    }

    add( userId ) {
    	return apiCall.addTime( userId, this )
    }

    delete( objTime ) {
    	return apiCall.deleteTime( objTime )
    }

    getAll( userId ) {
    	return apiCall.getAllTimes( userId )
    		.then((response) => {	
    			console.log(response.data.data);
				this.arrTimes = response.data.data;
    		})
    }


}