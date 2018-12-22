const mongoose = require('mongoose');
const courses = require('./../models/courses');
const {ObjectId} = require('mongodb');
const async = require('async');

const subscribeSchema = mongoose.Schema({
    user_id: String,
    courses: []
});

const subscribes = module.exports = mongoose.model('subscribe', subscribeSchema);

module.exports.get = (callback, limit) => {
    subscribes.find(callback).limit(limit);
};

module.exports.add = (data, req, callback) => {
    data.user_id = req.payload.id;
    subscribes.findByIdAndUpdate(req.payload.id, data, {upsert: true}, callback);
};

module.exports.getById = (id, callback) => {
    let query = {user_id: id};
    subscribes.findOne(query, function (error, data) {
        if (error) {
            callback(error, null);
        } else {
            if (data) {
                let subscription = data.toObject();
                async.map(subscription.courses, function (document, next) {
                    courses.findOne({_id: ObjectId(document)}).then(function (course, error) {
                        next(null, course.toObject());
                    })
                }, callback)
            }else{
                callback(null, []);
            }
        }
    });
};

module.exports.remove = (id, callback) => {
    let query = {_id: ObjectId(id)};
    subscribes.findOneAndRemove(query, function (error, data) {
        if (error) {
            return callback();
        } else {
            return data;
        }
    });
};




