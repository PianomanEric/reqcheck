const mysql2 = require('mysql2');
const connectionData = {
  host: 'database1.cluzlb16p6h1.us-west-1.rds.amazonaws.com',
  user: 'admin',
  database: 'mydb',
  password: 'csc-Team6',
  port: 3306,
}
const db = mysql2.createPool(connectionData);

module.exports = db.promise();