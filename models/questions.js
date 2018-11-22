const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

const questionSchema = mongoose.Schema({
    section_id:String,
    course_id:String,
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

module.exports.add = (data, callback) => {
	questions.create(data, callback);
}

module.exports.update = (id, data, options, callback) => {
	let query = {_id: id};
	let update = {
        section_id: data.section_id,
		course_id: data.course_id,
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



