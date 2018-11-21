const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
	question:{
		type: String
    },
    option:{
		type: Array
	},
	correctAnswer:{
		type: String
    },
    course:{
        type: String
    },
    section:{
        type: String
    }
});

const questions = module.exports = mongoose.model('questions', questionSchema);

// Get Users
module.exports.getUsers = (callback, limit) => {
	questions.find(callback).limit(limit);
}

// Add Question
module.exports.addQuestion = (question, callback) => {
	questions.create(question, callback);
}

// Update Question
module.exports.updateQuestion = (id, data, options, callback) => {
	var query = {_id: id};
	var update = {
        question: data.question,
        option: data.option,
        correctAnswer: data.correctAnswer,
        course: data.course,
        section: data.section
	}
	questions.findOneAndUpdate(query, update, options, callback);
}

// Delete Question
module.exports.removeQuestion = (id, callback) => {
	var query = {_id: id};
	questions.remove(query, callback);
}

/*
// Book Schema
const bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	image_url:{
		type: String
	},
	buy_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}

*/