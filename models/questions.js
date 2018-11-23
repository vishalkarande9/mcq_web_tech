const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

const questionSchema = mongoose.Schema({
	section_details:{
		section_id:String,
		section_title:String
	},
	course_details:{
		course_id:String,
		course_title:String 
	},
	question:String,
	option:[{
		option_number:Number,
		option_value:String,
		answer:Boolean
	}],
	difficulty_level:Number
});

const questions = module.exports = mongoose.model('questions', questionSchema);

module.exports.get = (callback, limit) => {
	questions.find(callback).limit(limit);
}

module.exports.getById = (id,callback) => {
	let query = {_id:id};

	questions.find(query,callback);
}

module.exports.add = (data, callback) => {
	questions.create(data, callback);
}

module.exports.update = (id, data, options, callback) => {
	let query = {_id: id};
	let update = {
        section_details: data.section_details,
		course_details: data.course_details,
		question: data.question,
		option: data.option,
		difficulty_level: data.difficulty_level

	}
	questions.findOneAndUpdate(query, update, options, callback);
}


module.exports.remove = (id, callback) => {
  
	let query = {_id: ObjectId(id)};
	questions.findOneAndRemove(query, callback);
}



