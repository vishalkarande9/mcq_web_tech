let courseSection = require('../models/courseSection');


function getById(req, res) {
    let id = req.query._id;
  //  let id = req.body._id;
    courseSection.getById(id, (err, result) => {
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
