const express = require("express");
const router = express.Router();
const {postAnswer,getAnswer}= require("../controller/answerControler");

// router.get("/all-questions",(req,res)=>{
//     res.send("all questions")
// })
// register route
router.post("/all-answer/:questionid", postAnswer);
router.get("/get-answer/:questionid", getAnswer);
module.exports = router;
