var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const routes = require('./utils/routes')
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/mcq');
var db = mongoose.connection;

app.use('/api',routes) 

app.listen(3000);
console.log("Running on port 3000..");

