const mysql2 = require('mysql2');
const connectionData = {
  host: '',
  user: '',
  database: 'mydb',
  password: '',
  port: 3306,
}
const db = mysql2.createPool(connectionData);

module.exports = db.promise();