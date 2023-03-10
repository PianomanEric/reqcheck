const PORT = 4000;

const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const connectionData = {
  host: "database1.cluzlb16p6h1.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "csc-Team6",
  port: 3306,
  database: "sys",
}

// Path to the react build folder
const build = path.join(__dirname, '..', 'client', 'build');

app.use(express.static(build));
app.use(express.json());
app.use(cors());

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
  const data = req.body.data
  const connection = mysql.createConnection(connectionData);
  console.log("Attempting to connect to db");
  connection.query(`insert into registration value ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.studentID}', '${data.password}')`, (err, result, fields) => {
    if (err) {
      console.log(err.stack)
      return;
    }
    console.log(result);
    res.json(result);
  });
  connection.end();
})

/*
app.get('/users', (req, res) => {
  const connection = mysql.createConnection(connectionData);
  console.log("Attempting to connect to db");
  connection.query("SELECT * FROM registration", (err, result, fields) => {
    if (err) {
      console.log(err.stack)
      return;
    }
    console.log(result);
    res.json(result);
  });
  connection.end();
});
*/

// All routes not handled above this point will return the react app
app.get('*', (req, res) => {
  res.sendFile(path.join(build, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});