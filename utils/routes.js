const express = require("express");
const question=require("./../apis/questions.js")
const router = express.Router();

router.post('/add',question.add)
router.delete('/remove/:_id',question.remove)
router.put('/update/:_id',question.update)


module.exports = router;


