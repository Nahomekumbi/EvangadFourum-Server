const express = require("express");
const router = express.Router();
const {
  postQuestion,
  singleQuestion,
  allQuestions,
} = require("../controller/questionControler");

// router.get("/all-questions",(req,res)=>{
//     res.send("all questions")
// })
// register route
router.post("/post-questions", postQuestion);
router.get("/single-question/:questionid", singleQuestion);
router.get("/all-questions", allQuestions);
module.exports = router;
