const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");
uuidv4();

async function postQuestion(req, res) {
  const userid = req.user.userid;
  const questionid = uuidv4();
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all information"})
  }
  try {
    await dbConnection.query(
      "INSERT INTO questions (userid,questionid,title,description) VALUES (?,?,?,?)",
      [userid, questionid, title, description]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "question inserted",questionid:questionid });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later!" });
  }
}
async function singleQuestion(req,res){
  const{questionid}=req.params
  
try {
 const [question1] = await dbConnection.query(
   "SELECT questions.*,users.username FROM questions INNER JOIN users ON questions.userid=users.userid WHERE questions.questionid=?",[questionid]
  //  "SELECT tittle, description from questions where questionid = ?  ",
  //  [questionid]
 )
 
  return res.status(StatusCodes.CREATED).json(question1);
} catch (error) {
return res
  .status(StatusCodes.INTERNAL_SERVER_ERROR)
  .json({ msg: "something went wrong try again later!" });
}

}


async function allQuestions(req, res) {
  const { questionid } = req.params;
  console.log(questionid);
  try {
    const question1 = await dbConnection.query(
      // "SELECT questions.title,questions.description,users.username FROM questions INNER JOIN users ON questions.userid=users.userid "
       "SELECT questions.*,users.username FROM questions INNER JOIN users ON questions.userid=users.userid"
    );
    return res.status(StatusCodes.CREATED).send(question1[0]);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later!" });
  }
}
module.exports = { postQuestion, singleQuestion, allQuestions };