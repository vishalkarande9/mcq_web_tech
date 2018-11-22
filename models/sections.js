const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const async = require('async');
var questions = require('./questions.js');


const sectionSchema = mongoose.Schema({
    section_title:String,
    section_description:String,
    course_id:String
});

const sections = module.exports = mongoose.model('sections', sectionSchema);

/*
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
*/

module.exports.get = (callback, limit) => {
	sections.find(callback).limit(limit);
}

module.exports.add = (data, callback) => {
	sections.create(data, callback);
}

module.exports.update = (id, data, options, callback) => {
	let query = {_id: id};
	let update = {
        section_title: data.section_title,
		section_description: data.section_description,
		course_id: data.course_id
	}
	sections.findOneAndUpdate(query, update, options, callback);
}


module.exports.remove = (id, callback) => {
  
	let query = {_id: id};
	sections.findOneAndRemove(query, function(err,result){
		if(err){
			console.log("error")
		} else{
			questions.find({course_id: id}).select('_id').sort({_id: 1}).limit(100)
			.exec(function (err, docs) {
				if(err){
					console.log("error in find",err);
				} else{
					console.log("inside esle of question");
					var ids = docs.map(function(doc) { return doc._id; });
						async.each(ids, function(item, callback) {
							questions.findOneAndRemove({_id: item}, function (err,result) {
							if(err){
								console.log("error in remove");
							}else{
								callback()
							}
						});
						}, function(err){
							callback()
		
						})
					}      
			});
		}
	});
}



