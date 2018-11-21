var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const routes = require('./utils/routes')


app.use(bodyParser.json());

users =require('./models/users');
//questions =require('./models/questions');
//Book =require('./models/book');

mongoose.connect('mongodb://localhost/mcq');

var db = mongoose.connection;

app.get('/',function(req, res){
    res.send('use /api/users or /api/sections');
});

app.get('/report',function(req, res){
	console.log("req :",req.data);
    //res.send('use /api/users or /api/sections');
});

app.get('/api/users', (req, res) => {
	users.getUsers((err, result) => {
		if(err){
			console.log("error :",err);
		}
		res.json(result);
	});
});

app.post('/api/users', (req, res) => {
	let user = req.body;
	users.addUser(user, (err, result) => {
		if(err){
			throw err;
		}
		res.json(result);
	});
});

app.put('/api/users/:_id', (req, res) => {
	let id = req.params._id;
	let user = req.body;
	users.updateUser(id, user, {}, (err, result) => {
		if(err){
			throw err;
		}
		res.json(result);
	});
});

app.delete('/api/users/:_id', (req, res) => {
	var id = req.params._id;
	users.removeUser(id, (err, result) => {
		if(err){
			throw err;
		}
		res.json(result);
	});
});





// ********************************************************************
app.use('/api/questions',routes) 

app.listen(3000);
console.log("Running on port 3000...");

/*
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre =require('./models/genre');
Book =require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', (req, res) => {
	Genre.getGenres((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addGenre(genre, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000...');

*/