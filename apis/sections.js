let sections = require('./../models/sections');


function get(req, res) {
    sections.get((err, result) => {
		if(err){
            let obj={
                code:400,
                message:err
                }
            res.json(obj);
		} else{
            let obj={
                code:200,
                message:"success",
                data:result
            }
            res.json(obj);
        }
	}); 
}

function add(req, res) {
    let request = req.body;     
    sections.add(request, (err, result) => {
		if(err){
            let obj={
                code:400,
                message:err
                }
            res.json(obj);
		} else{
            let obj={
                code:200,
                message:"success"
                }
            res.json(obj);
        }
	});
}

function remove(req, res) {
    console.log("inside api remove");
    let id = req.body.id;
    sections.remove(id, (err, result) => {
		if(err){
            let obj={
                code:400,
                message:err
                }
            res.json(obj);
		} else{
            let obj={
                code:200,
                message:"success"
                }
            res.json(obj);
        }
    });
    
}

function update(req, res) {
    let id = req.body._id;
	let data = req.body;

    sections.update(id, data, {}, (err, result) => {
		if(err){
            let obj={
                code:400,
                message:err
                }
            res.json(obj);
        } else{
            let obj={
                code:200,
                message:"success"
                }
            res.json(obj);
        }
	});
}

function getById(req, res) {
    let id = req.body._id;
    courses.getById(id, (err, result) => {
		if(err){
            let obj={
                code:400,
                message:err
                }
            res.json(obj);
        } else{
            let obj={
                code:200,
                message:"success",
                data:result
                }
            res.json(obj);
        }
	});
}

module.exports.getById = getById  
module.exports.get = get 
module.exports.add = add 
module.exports.remove = remove 
module.exports.update = update 



