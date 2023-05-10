const express = require('express');
const app = express();
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const fetch = require('node-fetch');
const api = process.env.COUNTRY_API;


app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout')
app.use(express.static('public'));
app.use(expressLayouts);


app.get('/', (req, res)=>{
    res.render('index', {api: api});

})

app.get('/country/:name', async (req, res)=>{
    try {
        const name = req.params.name; // Get the country name from the request parameters
        const url = api + `${name}`; // Construct the URL for the external API
        const response = await fetch(url); // Call the external API using the fetch function
        const data = await response.json(); // Extract the JSON data from the response
        res.send(data); // Send the data back to the client
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

const testRouter = require('./routes/test');
app.use('/test', testRouter);




app.listen(process.env.PORT || 3000);