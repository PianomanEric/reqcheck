const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const port = process.env.port || process.env.PORT || 5000

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

// All routes not handled above this point will return the react app
app.get('*', (req, res) => {
  res.sendFile(path.join(build, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});