const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const { registrationValidator } = require('../../middleware/validation');

router.post('/login', (req, res) => {
    res.json({success: true});
})

router.use('/register', registrationValidator);
router.post('/register', (req, res) => {
    db.query(`SELECT * FROM registration`)
    .then(([rows, fields]) => {
        console.log(rows);
    });
    /*
    const data = req.body;
    if (data.firstName && data.lastName && data.email && data.studentID && data.password) {
        db.execute(`insert into registration value ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.studentID}', '${data.password}')`)
        .then((err, result, fields) => {
            if (err) {
                console.log(err.stack);
                res.send();
                console.log('Account registration failed!');
                return;
            }
            console.log(result);
            res.json(result);
            console.log('Account registration succeeded!');
        });
    } else {
        console.log('Missing data!');
        res.json();
        return;
    }*/
    res.json([]);
})

module.exports = router;