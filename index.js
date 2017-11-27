
// Root path
global.ROOT_PATH = __dirname + '/app/';
// Set other app paths
require('./config/paths');
global.config = require('./config');


// Express App
const express = require('express');
const app = express();


// Dependencies
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());


 
app.listen( global.config.PORT, function () {
    console.log( 'App is running on ' +  global.config.PORT );
});