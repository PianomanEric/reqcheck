const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const port = process.env.port || process.env.PORT || 5000
const bodyParser = require('body-parser');

const connectionData = {
  host: "database1.cluzlb16p6h1.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "csc-Team6",
  port: 3306,
  database: "sys",
}

app.use(express.json());
app.use(bodyParser.urlencoded(true));
app.use(cors({
  origin: true,
}));
// app.use(bodyParser.urlencoded(true));
// A route to test the db
// This might be sloppy
// Feel free to reorganize or change anything I did wrong
app.get("/dbtest", (req, res) => {
  const connection = mysql.createConnection(connectionData);
  console.log("Attempting to connect to db");
  connection.query("SELECT * FROM courses", (err, result, fields) => {
    if (err) {
      console.log(err.stack)
      return;
    }
    console.log(result);
    res.json(result);
  });
  connection.end();
})

app.post("/register", (req, res) => {
  console.log(req.body);
  const connection = mysql.createConnection(connectionData);
  console.log("Attempting to connect to db");
  connection.query(`insert into registration value ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.id}', '${req.body.password}')`, (err, result, fields) => {
    if (err) {
      console.log(err.stack)
      return;
    }
    console.log(result);
    res.json(result);
  });
  connection.end();
})

// Start the server
app.listen(6000, () => {
  console.log(`Server listening on port ${6000}`);
});