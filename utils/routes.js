const express = require("express");
const question=require("./../apis/questions.js");
const course=require("./../apis/courses.js");
const section=require("./../apis/sections.js");
const router = express.Router();

router.get('/course/get',course.get)
router.post('/course/update',course.update)
router.put('/course/add',course.add)
router.delete('/course/delete',course.remove)
//router.delete('/course/deleteMany',course.deleteMany)


router.get('/section/get',section.get)
router.post('/section/update',section.update)
router.put('/section/add',section.add)
router.delete('/section/delete',section.remove)

router.get('/question/get',question.get)
router.post('/question/update',question.update)
router.put('/question/add',question.add)
router.delete('/question/delete',question.remove)


module.exports = router;


