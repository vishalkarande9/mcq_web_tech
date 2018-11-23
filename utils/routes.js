const express = require("express");
const question=require("./../apis/questions.js");
const course=require("./../apis/courses.js");
const section=require("./../apis/sections.js");
const router = express.Router();

router.get('/course/get',course.get)
router.get('/course/getById',course.getById)
router.post('/course/update',course.update)
router.put('/course/add',course.add)
router.delete('/course/delete',course.remove)


router.get('/section/get',section.get)
router.get('/section/getById',section.getById)
router.post('/section/update',section.update) 
router.put('/section/add',section.add)
router.delete('/section/delete',section.remove)

router.get('/question/get',question.get)
router.get('/question/getById',question.getById)
router.post('/question/update',question.update)
router.put('/question/add',question.add)
router.delete('/question/delete',question.remove)


module.exports = router;


