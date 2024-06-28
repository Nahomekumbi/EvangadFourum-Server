require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

const cors =require('cors')
app.use(cors())

// db connection
const dbConnection = require("./db/dbConfig.js");

// user routes middleware file
const userRoutes = require("./routes/userRoutes");

// question routes middleware file
const questionsRoutes = require("./routes/questionRoute.js");
// answer routes middleware file
const answerRoutes = require("./routes/answerRout.js");

// authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");

// json middleware to extract json data
app.use(express.json());

// user routes middleware

app.use("/api/users", userRoutes);

// question routes middleware
app.use("/api/questions", authMiddleware, questionsRoutes);

// answer routes middleware
app.use("/api/answer", authMiddleware, answerRoutes);


async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(err.message);
  }
}
start();
