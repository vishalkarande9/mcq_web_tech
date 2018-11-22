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
    let id = req.body._id;
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

function deleteMany(req, res) {
    let course_title = req.body.course_title;
  //  let course_title = JSON.parse(req.body.course_title);
//console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",course_title)
    courses.deleteMany(course_title, (err, result) => {
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



module.exports.get = get 
module.exports.add = add 
module.exports.remove = remove
module.exports.deleteMany = deleteMany  
module.exports.update = update 



