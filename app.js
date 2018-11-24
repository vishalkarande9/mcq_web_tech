var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const routes = require('./utils/routes')
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
const cors = require('cors');

mongoose.connect('mongodb://localhost/mcq');
var db = mongoose.connection;
app.use(cors());
app.use('/api',routes) 
app.listen(3001);
console.log("Running on port 3001..");

