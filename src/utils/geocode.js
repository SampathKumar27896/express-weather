const request = require('request');

//Fucntion to get latitude and logitude 
//Input: Address
//Output: Lattitude and Logitude
const geocode = (address, callback) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FtcGF0aC1rdW1hciIsImEiOiJja2Q1bGdxeGEwMjd2MnVuNXRnZjFjdWI3In0.CLdA_9dpjIUnaNZECfi2DA';
    const mapboxOptions = {
        url : mapboxUrl,
        json : true
    };
    request(mapboxOptions, (error, {body} = {}) => {
       
        if(error){
             callback("Unable to connect with the location services.Please try again later!.",undefined);
        }else if(body.features.length === 0){
           
            callback("Location not found.Please try a different location!.",undefined);
        }else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data);
        }
    })

}

module.exports = geocode;
