const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const async = require('async');
const sections = require('./sections.js');

module.exports.getById = (id,callback) => {


    sections.find({"course_details.course_id":id}).select().sort({_id: 1}).limit(100)
        .exec(function (err, docs) {
            if(err){
                console.log("error in find",err);
                callback(err,docs)
            } else{
                callback(err,docs)
            }
        })
}