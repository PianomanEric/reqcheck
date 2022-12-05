const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../../config/database');
const { registrationValidator, loginValidator } = require('../../middleware/validation');

const SALT_ROUNDS = 10; // For use with bcrypt

const createAccessToken = (username) => {
    return jwt.sign(
        {
            username: username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h',
        },
    );
}

router.post('/login', loginValidator, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM registration WHERE email = ?', [email])
    .then(([results, fields]) => {
        if (results && results.length == 1) {
            console.log(results);
            console.log(password);
            console.log(results[0].password);
            return bcrypt.compare(password, results[0].password);
        } else {
            throw new Error("Account not found!");
        }
    })
    .then((passwordMatched) => {
        console.log(passwordMatched);
        if (passwordMatched) {
            console.log("Successful login!");
            const token = createAccessToken(email);
            res.cookie('jwt', token, {
                
            });
            res.json({ username: email });
        } else {
            console.log("Password was incorrect!");
            res.send("Password was incorrect!");
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(err.message);
    })
});

// Temporary unprotected route to delete a specific test account by student id
router.get('/deleteAccount/:userID', (req, res) => {
    db.query('DELETE FROM registration WHERE registrationID = ?', [req.params.userID])
    .then(([results, fields]) => {
        console.log(results);
        if (results && results.affectedRows > 0) {
            res.send("Successfully deleted!");
        } else {
            res.send("Account not found!");
        }
    })
});

// Temporary route to expose all accounts
router.get('/accounts', (req, res) => {
    db.query('SELECT * FROM registration')
    .then(([results, fields]) => {
        res.send(results);
    })
})

router.post('/register', registrationValidator, (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const studentID = req.body.studentID;
    const password = req.body.password;

    db.query('SELECT * FROM registration WHERE registrationID = ?', [studentID])
    .then(([results, fields]) => {
        if (results && results.length === 0) {
            return db.query('SELECT * FROM registration WHERE email = ?', [email]);
        } else {
            console.log("Registration failure!");
            throw new Error("An account already exists with this ID!");
        }
    })
    .then(([results, fields]) => {
        if (results && results.length === 0) {
            console.log("Registration can continue!");
            console.log(password);
            return bcrypt.hash(password, SALT_ROUNDS);
        } else {
            console.log("Registration failure!");
            throw new Error("An account already exists with this email!");
        }
    })
    .then((passwordHash) => {
        console.log(passwordHash);
        return db.query('INSERT INTO registration (firstname, lastname, email, registrationID, password) VALUES (?, ?, ?, ?, ?);',
            [firstName, lastName, email, studentID, passwordHash]);
    })
    .then(([results, fields]) => {
        if (results && results.affectedRows === 1) {
            console.log("Created account!");
            res.send("Created account!");
        } else {
            console.log("Account creation failed!");
            res.send("Account creation failed!");
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(err.message);
    });
});

module.exports = router;