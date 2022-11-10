const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const connectionData = {
  host: "database1.cluzlb16p6h1.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "csc-Team6",
  port: 3306,
  database: "sys",
}
app.use(cors());
app.use(bodyParser.urlencoded(true));

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
// app.get('*', (req, res) => {
//   res.sendFile(path.join(build, 'index.html'));
// });

// Start the server
app.listen(4000, () => {
  console.log(`Server listening on port ${4000}`);
});