let questions = require('./../models/questions');

function add(req, res) {
    let question = req.body;     
    questions.addQuestion(question, (err, result) => {
		if(err){
			throw err;
		}
		res.json(result);
	});
}

function remove(req, res) {
    let id = req.params._id;

   questions.removeQuestion(id, (err, result) => {
		if(err){
			throw err;
		}
		res.json(result);
	});
}

function update(req, res) {
    let id = req.params._id;
	let data = req.body;

    questions.updateUser(id, data, {}, (err, result) => {
		if(err){
			throw err;
		}
		res.json(result);
	});
}


module.exports.add = add 
module.exports.remove = remove 
module.exports.update = update 



