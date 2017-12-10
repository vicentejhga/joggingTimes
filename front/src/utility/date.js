export default {
 	dateFormat:function(inputFormat) {
        let pad = (s) => { return (s < 10) ? '0' + s : s; }
        var d = new Date( inputFormat );
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    },

 	convertfromSecondsToHMS:function( seconds )  {   
		var date = new Date(null);
    	date.setSeconds(seconds); 
    	return date.toISOString().substr(11, 8);
    },

    convertHMSToSeconds:function( hms ){
        var a = hms.split(':'); 
        return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    },
}