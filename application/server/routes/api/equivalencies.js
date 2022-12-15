const express = require('express');
const router = express.Router();
const db = require('../../config/database');

router.get('/', (req, res) => {
    let numConditions = 0;
    const baseQuery = `SELECT * FROM equivalency`;
    const schoolQuery = ' foreignSchool = ?';
    const courseQuery = ' foreignCourse = ?';
    let query = baseQuery;
    let queryParams = [];
    if (req.query.school) {
        queryParams.push(req.query.school);
        query += (numConditions === 0) ? ' WHERE' : ' AND';
        query += schoolQuery;
        numConditions += 1;
    }
    if (req.query.course) {
        queryParams.push(req.query.course);
        query += (numConditions === 0) ? ' WHERE' : ' AND';
        query += courseQuery;
        numConditions += 1;
    }
    db.query(query, queryParams).then(([results, fields]) => {
      console.log(results);
      return res.json(results);
    }).catch((err) => {
      console.log("Could not search equivalencies!");
      console.log(err.stack)
      return res.json([]);
    });
});

router.get('/schools', (req, res) => {
    db.query('SELECT DISTINCT foreignSchool FROM equivalency').then(([results, fields]) => {
      console.log(results);
      return res.json(results.map((element) => element.foreignSchool));
    }).catch((err) => {
      console.log("Could not search schools!");
      console.log(err.stack)
      return res.json([]);
    });
});


module.exports = router;