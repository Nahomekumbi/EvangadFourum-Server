const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");


async function postAnswer(req, res) {
  const userid = req.user.userid;
 const {questionid} = req.params;
  const { answer } = req.body;
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all information" });
  }
  try {
   
    await dbConnection.query(
      "INSERT INTO answers (userid,questionid,answer) VALUES (?,?,?)",
      [userid, questionid, answer]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "answer inserted" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later!" });
  }

}
async function getAnswer(req, res) {
  const { questionid } = req.params;

  try {
    const [answer] = await dbConnection.query(
      "SELECT answers.*,users.username FROM answers INNER JOIN users ON answers.userid=users.userid WHERE answers.questionid=?",
      [questionid]
     
    );

    return res.status(StatusCodes.CREATED).json(answer);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later!" });
  }
}

module.exports = { postAnswer, getAnswer };
