let questions = require('../models/questions');

function get(req, res) {
    questions.get((err, result) => {
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



function add(req, res) {
    let request = req.body;

    console.log("DATA IS :", request);
    questions.add(request, (err, result) => {
        if (err) {
            let obj = {
                code: 400,
                message: err
            };
            res.json(obj);
        } else {
            let obj = {
                code: 200,
                message: "success"
            };
            res.json(obj);
        }
    });
}

function remove(req, res) {
    let id = req.query._id;
    questions.remove(id, (err, result) => {
        if (err) {
            let obj = {
                code: 400,
                message: err
            };
            res.json(obj);
        } else {
            let obj = {
                code: 200,
                message: "success"
            };
            res.json(obj);
        }
    });

}

function update(req, res) {
    let id = req.body._id;
    let data = req.body;

    questions.update(id, data, {}, (err, result) => {
        if (err) {
            let obj = {
                code: 400,
                message: err
            };
            res.json(obj);
        } else {
            let obj = {
                code: 200,
                message: "success"
            };
            res.json(obj);
        }
    });
}

function getById(req, res) {
    let id = req.body._id;
    questions.getById(id, (err, result) => {
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

function getByCourseSectionAndDifficulty(req, res) {
    let course_id = req.query.course_id;
    let section_id = req.query.section_id;
    let difficulty_level = req.query.difficulty_level;

    questions.getSectionCourseDifficultyLevel(course_id, section_id, difficulty_level, (err, result) => {
        if (err) {
            let obj = {
                code: 400,
                message: err
            };
            res.json(obj);
        } else {
            console.log(result);
            let obj = {
                code: 200,
                message: "success",
                data: result
            };
            res.json(obj);
        }
    });
}

module.exports.getById = getById;
module.exports.get = get;
module.exports.add = add;
module.exports.remove = remove;
module.exports.update = update;
module.exports.getByCourseSectionAndDifficulty = getByCourseSectionAndDifficulty;
 





