let courses = require('./../models/courses');


function get(req, res) {
    courses.get((err, result) => {
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
    courses.add(request, (err, result) => {
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
    console.log("req :",req.query);
    let id = req.query._id;
   // console.log("id :",id);
    courses.remove(id, (err, result) => {
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
    console.log("req :",req);
    let id = req.body._id;
	let data = req.body;

    courses.update(id, data, {}, (err, result) => {
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



module.exports.get = get 
module.exports.add = add 
module.exports.remove = remove
module.exports.getById = getById  
module.exports.update = update 



