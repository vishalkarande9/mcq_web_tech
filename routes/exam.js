let exams = require('../models/exam');

function get(req, res) {
    exams.get((err, result) => {
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
                data: result
            };
            res.json(obj);
        }
    });
}

function getSum(total, num) {
    return total + num.score;
}

function add(req, res) {
    if (!req.payload.id) {
        res.status(401).json({
            "reason": "Unauthorized"
        });
    } else {
        let request = req.body;
        exams.add(request, req, (err, results) => {
            if (err) {
                let obj = {
                    code: 400,
                    message: err
                };
                res.json(obj);
            } else {
                let score = results.reduce(getSum, 0)
                let obj = {
                    code: 200,
                    message: "success",
                    data: {
                        final_score: score
                    }
                };
                res.json(obj);
            }
        });
    }
}

function getExams(req, resp){
    if (!req.payload.id) {
        res.status(401).json({
            "reason": "Unauthorized"
        });
    } else {
        exams.getExamsByUserId(req.payload.id, (err, results) => {
            if (err) {
                let obj = {
                    code: 400,
                    message: err
                };
                resp.json(obj);
            } else {
                let obj = {
                    code: 200,
                    message: "success",
                    data : results
                };
                resp.json(obj);
            }
        });
    }
}

module.exports.get = get;
module.exports.add = add;
module.exports.get_user = getExams;





