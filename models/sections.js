const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const async = require('async');
var questions = require('./questions.js');


const sectionSchema = mongoose.Schema({
    section_title: String,
    section_description: String,
    course_details: {
        course_id: String,
        course_title: String
    }
});

const sections = module.exports = mongoose.model('sections', sectionSchema);


module.exports.get = (callback, limit) => {
    sections.find(callback).limit(limit);
}

module.exports.getById = (id, callback) => {
    let query = {_id: id};

    sections.find(query, callback);
}

module.exports.getByCourseId = (id, callback) => {
    let query = {"course_details.course_id": id};

    sections.find(query, callback);
}

module.exports.add = (data, callback) => {
    sections.create(data, callback);
}

module.exports.update = (id, data, options, callback) => {
    let query = {_id: id};
    let update = {
        section_title: data.section_title,
        section_description: data.section_description,
        course_id: data.course_id,
        course_details: data.course_details
    }
    sections.findOneAndUpdate(query, update, options, function (err, result) {
        if (err) {
            console.log("error");
        } else {
            questions.find({"section_details.section_id": id}).select('_id').sort({_id: 1}).limit(100)
                .exec(function (err, docs) {
                    if (err) {
                        console.log("error in find", err);
                    } else {
                        var ids = docs.map(function (doc) {
                            return doc._id;
                        });
                        async.each(ids, function (item, callback) {
                            let update_question = {
                                section_details: {
                                    section_id: item,
                                    section_title: data.section_title
                                }
                            }
                            questions.findOneAndUpdate({_id: item}, update_question, options, function (err, result) {
                                if (err) {
                                    console.log("error in remove");
                                } else {
                                    callback()
                                }
                            });
                        }, function (err) {
                            callback()

                        })
                    }
                });
        }
    });
}


module.exports.remove = (id, callback) => {

    let query = {_id: id};
    sections.findOneAndRemove(query, function (err, result) {
        if (err) {
            console.log("error")
        } else {
            questions.find({"seaction_details.section_id": id}).select('_id').sort({_id: 1}).limit(100)
                .exec(function (err, docs) {
                    if (err) {
                        console.log("error in find", err);
                    } else {
                        var ids = docs.map(function (doc) {
                            return doc._id;
                        });
                        async.each(ids, function (item, callback) {
                            questions.findOneAndRemove({_id: item}, function (err, result) {
                                if (err) {
                                    console.log("error in remove");
                                } else {
                                    callback()
                                }
                            });
                        }, function (err) {
                            callback()

                        })
                    }
                });
        }
    });
}



