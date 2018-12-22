const mongoose = require('mongoose');
const questions = require('./../models/questions');
const courses = require('./../models/courses');
const sections = require('./../models/sections');
const Schema = mongoose.Schema;
const async = require('async');

const {ObjectId} = require('mongodb');

const examSchema = mongoose.Schema({
    user_id: {
        type: String
    },
    course_id: {
        type: Schema.Types.ObjectId, ref: 'Course'
    },
    section_id: {
        type: Schema.Types.ObjectId, ref: 'Section'
    },
    difficulty_level: Number,
    question_id: {
        type: Schema.Types.ObjectId, ref: 'Question'
    },
    option_number: Number,
    score: Number
});

const exams = module.exports = mongoose.model('exams', examSchema);

module.exports.get = (callback, limit) => {
    exams.find(callback).limit(limit);
};

module.exports.add = (data, req, callback) => {
    async.map(data, function (document, next) {
        questions.findOne({_id: ObjectId(document.question_id)},
            function (error, result) {
                if (error) {

                } else {
                    let question = result.toObject();
                    document.score = 0;
                    for (let i = 0; i < question.option.length; i++) {
                        if (question.option[i].answer && question.option[i].option_number === document.option_number) {
                            document.score = 1;
                        }
                    }
                    let examData = new exams(document);
                    examData.user_id = req.payload.id;
                    exams.findOneAndUpdate({
                        user_id: examData.user_id,
                        question_id: examData.question_id,
                        course_id: examData.course_id,
                        section_id: examData.section_id
                    }, document, {upsert: true}, function (error, result) {
                        next(null, document);
                    });
                }
            })
    }, callback);
};

module.exports.getByCourseSectionIdAndDifficultyLevel = (course_id, section_id, difficulty_level, callback) => {
    let query = {course_id: course_id, section_id: section_id, difficulty_level: difficulty_level};
    exams.find(query, callback);
};

module.exports.getExamsByUserId = (id, callback) => {
    let user_data = exams.aggregate([{$match: {user_id: id}},
        // {
        //     $group: {_id: "$course_id", score: {$sum: "$score"}}
        // },
        // {
        //     $group: {_id: "$section_id", score: {$sum: "$score"}}
        // },
        {
            $group: {
                _id: {
                    course_id: "$course_id",
                    section_id: "$section_id",
                    difficulty_level: "$difficulty_level"
                }, score: {$sum: "$score"}
            }
        }]).then(function (results, error) {
        if (error) {
            callback(error, null);
        } else {
            async.map(results, function (document, next) {
                sections.findById(document._id.section_id.toString(),
                    function (error, result) {
                        if (error) {

                        } else {
                            let section = result.toObject();
                            document.section_details = section;
                            next(null, document);
                        }
                    })
            }, callback);
        }
    });
};





