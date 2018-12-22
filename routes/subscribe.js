let subscription = require('../models/subscribe');
let config = require('../config/index');

function getById(req, res) {
    if (!req.payload.id) {
        res.status(401).json({
            "reason": "Unauthorized"
        });
    } else {
        subscription.getById(req.payload.id, (err, results) => {
            if (err) {
                let obj = {
                    code: 400,
                    message: err
                };
                res.json(obj);
            } else {
                let obj = {
                    code: 200,
                    message: "success",
                    data: results
                };
                res.json(obj);
            }
        });
    }
}

function add(req, res) {
    if (!req.payload.id) {
        res.status(401).json({
            "reason": "Unauthorized"
        });
    } else {
        let request = req.body;
        console.log("DATA IS :", request);
        subscription.add(request, req, (err, results) => {
            if (err) {
                let obj = {
                    code: 400,
                    message: err
                };
                res.json(obj);
            } else {
                let obj = {
                    code: 200,
                    message: "success",
                    data: results
                };
                res.json(obj);
            }
        });
    }
}

module.exports.getById = getById;
module.exports.add = add;