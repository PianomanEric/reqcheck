const express = require('express');
const router = express.Router();
const db = require('../../config/database');

router.get('/', (req, res) => {
  db.query('SELECT * FROM demo').then(([results, fields]) => {
    console.log(results);
    return res.json(results);
  }).catch((err) => {
    console.log(err);
    console.log("Could not search courses!");
    return res.json([]);
  });
})

router.get('/search', (req, res) => {
  const searchQuery = req.query.query
  db.query('SELECT * FROM demo WHERE codeID LIKE ?', [`%${searchQuery}%`]).then(([results, fields]) => {
    console.log(results);
    return res.json(results);
  }).catch((err) => {
    console.log("Could not search courses!");
    console.log(err.stack)
    return res.json([]);
  });
});

module.exports = router;