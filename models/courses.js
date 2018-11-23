const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const async = require('async');
const questions = require('./questions.js');
const sections = require('./sections.js');


const courseSchema = mongoose.Schema({
    course_title:String,
    course_description:String,
    course_code:String
});

const courses = module.exports = mongoose.model('courses', courseSchema);

module.exports.get = (callback, limit) => {
	courses.find(callback).limit(limit);
}

module.exports.add = (data, callback) => { 
	courses.create(data, callback);
}

module.exports.getById = (id,callback) => {
	let query = {_id:id};

	courses.find(query,callback);
}

	
module.exports.update = (id, data, options, callback) => {
	let query = {_id: id};
	let update = {
        course_title: data.course_title,
        course_description: data.course_description, 
        course_code: data.course_code
	}
	courses.findOneAndUpdate(query, update, options, function(err,result){
		if(err){
			console.log("error")
		} else{
			sections.find({"course_details.course_id":id}).select('_id').sort({_id: 1}).limit(100)
			.exec(function (err, docs) {
				if(err){
					console.log("error in find",err);
				} else{
					
					var ids = docs.map(function(doc) { return doc._id; });
						async.each(ids, function(item, callback) {
							let update_section = {
								course_details : {
									course_id:id,
									course_title:data.course_title
								}
							}
							sections.findOneAndUpdate({_id: item}, update_section, options, function (err,result) {
							if(err){
								console.log("error in remove");
							}else{
								console.log("updated successfully");
								callback()
							}
						});
						}, function(err){

							questions.find({"course_details.course_id":id}).select('_id').sort({_id: 1}).limit(100)
							.exec(function (err, docs) {
								if(err){
									console.log("error in find",err);
								} else{
									
									var ids = docs.map(function(doc) { return doc._id; });
										async.each(ids, function(item, callback) {
											let update_question = {
												course_details : {
													course_id:id,
													course_title:data.course_title
												}
											}
											questions.findOneAndUpdate({_id: item}, update_question, options,  function (err,result) {
											if(err){
												console.log("error in remove");
											}else{
												console.log("updated successfully");
												callback()
											}
										});
										}, function(err){
											callback()
						
										})
									}      
							});
		
						})
					}      
			});
		}

	});
}




module.exports.remove = (id, callback) => {
  
	let query = {_id: ObjectId(id)};
	courses.findOneAndRemove(query, function(err,result){
		if(err){
			console.log("error")
		} else{
			sections.find({"course_details.course_id":id}).select('_id').sort({_id: 1}).limit(100)
			.exec(function (err, docs) {
				if(err){
					console.log("error in find",err);
				} else{
					
					var ids = docs.map(function(doc) { return doc._id; });
						async.each(ids, function(item, callback) {
							sections.findOneAndRemove({_id: item}, function (err,result) {
							if(err){
								console.log("error in remove");
							}else{
								console.log("deleted successfully");
								callback()
							}
						});
						}, function(err){

							questions.find({"course_details.course_id":id}).select('_id').sort({_id: 1}).limit(100)
							.exec(function (err, docs) {
								if(err){
									console.log("error in find",err);
								} else{
									
									var ids = docs.map(function(doc) { return doc._id; });
										async.each(ids, function(item, callback) {
											questions.findOneAndRemove({_id: item}, function (err,result) {
											if(err){
												console.log("error in remove");
											}else{
												console.log("deleted successfully");
												callback()
											}
										});
										}, function(err){
											callback()
						
										})
									}      
							});
		
						})
					}      
			});
		}
	});
}




