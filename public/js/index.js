


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// const weatherForm = document.querySelector('form');
// const search = document.querySelector('input');
// const location = search.value;
// weatherForm.addEventListener('submit', (event) =>{

//     event.preventDefault();
//     if(location){
        
//             fetch('http://localhost:3000/?search='+location).then((response) => {
//                 response.json().then((data) => {
//                     console.log(data);
//                 })
//             })
//     }
//     console.log(search.value);
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('.input');
const weatherInfo = document.querySelector('.info');

weatherForm.addEventListener('submit', (event) => {
    weatherInfo.textContent = 'Loading...';
    event.preventDefault();
    const address = search.value;
   
        
        fetch('/weather?search=' + address).then( (response) => {
           return response.json();
        }).then( (data) => {
            if(data.error){
                console.log(data);
                weatherInfo.textContent = data.error;
            }else{
               
                let weatherDescription = "It looks " + data.current.weather_descriptions[0] + " in "+data.location+ " and the temperature is "+data.current.temperature+" degrees.";
                console.log(weatherDescription);
                weatherInfo.textContent = weatherDescription;
            }
        }).catch( (e)=>{
            console.log(e);
        })
          
    
})