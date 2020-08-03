const request = require('request');



//Function to get the weather information 
//Input: Latitude and Longitude of a location 
//Output: Weather information
const forecast = (latitude, longitude, callback) => {
    const weatherOptions = {
        url: 'http://api.weatherstack.com/current?access_key=c9822ae540b80a60c6e9b6608e29c265&query='+latitude+','+longitude,
        json: true
    };
    request(weatherOptions, (error, {body}) => {
        if(error){
            callback('Unable to connect with weather services. Please try again later!.', undefined);
        }else if(body.error){
            callback('Unable to get weather information. Please try again later!.');
        }else{
            callback(undefined, { current : body.current, location : body.location});
        }
    });
}

module.exports = forecast;