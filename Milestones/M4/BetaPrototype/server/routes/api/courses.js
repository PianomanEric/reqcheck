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
  const searchQuery = req.query.query.replaceAll(/( )/g, '');
  console.log(searchQuery);
  db.query('SELECT * FROM demo WHERE codeID LIKE ?', [`%${searchQuery}%`]).then(([results, fields]) => {
    console.log(results);
    return res.json(results);
  }).catch((err) => {
    console.log("Could not search courses!");
    console.log(err.stack)
    return res.json([]);
  });
});

router.get('/:courseID', (req, res) => {
  const courseID = req.params.courseID;
  db.query('SELECT * FROM demo WHERE codeID = ?', [courseID]).then(([results, fields]) => {
    if (results.length == 1) {
      return res.json(results[0]);
    } else {
      return res.json([]);
    }
  }).catch((err) => {
    return res.json([]);
  });
});

module.exports = router;