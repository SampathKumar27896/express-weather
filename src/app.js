const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const port = process.env.PORT || 3000;
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine','hbs');
app.set('views', viewPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
        
            res.render('index',{
                title: "Weather"
            });
})

app.get('/weather', (req, res) => {
   
    if(req.query.search){
        geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
            if(error){
                res.send({error});
            }else{
                forecast(latitude, longitude, (error, {current, location} = {}) => {
                    if(error){
                        res.send({error});
                    }else{
                       let loc = location.name +", " + req.query.search;
                       res.send({current, location : loc});
                    }
                });
            }
        })
    }else{
        res.send({error : "Please provide a location!."});
    }
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'sam'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page not found",
    })
})

app.listen(port, () => {
    console.log("The app is up and running on the port " +  port);
})