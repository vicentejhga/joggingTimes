
// Root path
global.ROOT_PATH = __dirname + '/app/';
// Set other app paths
require('./config/global-paths');


// Set config variables
global.config = require('./config');

// Create an Express App
const express = require('express');
const app = express();


// Include dependencies
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require(ROUTE_PATH);
const ValidationManager = require(MANAGER_PATH + 'validation');
const authManager = require(MANAGER_PATH + 'auth');
const validationManager = new ValidationManager();


// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(config.db.MONGO_CONNECT_URL);




// Use json formatter middleware
app.use(bodyParser.json());
app.use(authManager.providePassport().initialize());


// Set Up validation middleware
app.use(validationManager.provideDefaultValidator());


// Setup routes
app.use('/', routes);

app.listen(global.config.server.PORT, function () {
    console.log('App is running on ' + global.config.server.PORT);
});