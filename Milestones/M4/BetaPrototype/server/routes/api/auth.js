const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../../config/database');
const { registrationValidator, loginValidator } = require('../../middleware/validation');

const SALT_ROUNDS = 10; // For use with bcrypt

const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;

const INACTIVITY_TIMEOUT = 5 * DAYS;

const createAccessToken = (user) => {
    return jwt.sign(
        {
            user: user,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: INACTIVITY_TIMEOUT,
        },
    );
}

const respondWithToken = (req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const token = createAccessToken(user);
    res.cookie('jwt', token, {
        maxAge: INACTIVITY_TIMEOUT,
        //secure: true,
        httpOnly: true,
    });
    db.query('SELECT firstname, lastname, email FROM registration WHERE registrationID = ?', [user]).then(([results, fields]) => {
        console.log(user);
        if (results.length > 0) {
            res.json({
                user: user,
                email: results[0].email,
                firstname: results[0].firstname,
                lastname: results[0].lastname,
                roles: [1],
            });
            console.log('Found the account');
            console.log(results);
        } else {
            console.log("Account didn't exist!");
        }
    });
}

// Temporary route to expose all accounts
router.post('/verifyToken', (req, res, next) => {
    console.log(req);
    const user = req.body.user;
    const token = req.cookies.jwt;
    if (!user) {
        return res.json(null);
    }
    if (!token) {
        return res.json(null);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.json(null);
        } else {
            console.log(decoded.user, user);
            if (decoded.user === user) {
                db.query('SELECT * FROM registration WHERE registrationID = ?', [user])
                .then(([results, fields]) => {
                    if (results && results.length === 1) {
                        console.log("Valid token!");
                        console.log(decoded);
                        next()
                    } else {
                        return res.json(null);
                    }
                });
            } else {
                console.log("it was not the same user");
                return res.json(null);
            }
        }
    });
}, respondWithToken);

router.post('/login', loginValidator, (req, res, next) => {
    const user = req.body.user;
    const password = req.body.password;

    db.query('SELECT * FROM registration WHERE registrationID = ?', [user])
    .then(([results, fields]) => {
        if (results && results.length == 1) {
            console.log(results);
            console.log(password);
            console.log(results[0].password);
            return bcrypt.compare(password, results[0].password);
        } else {
            throw new Error("There is no account associated with that ID.");
        }
    })
    .then((passwordMatched) => {
        console.log(passwordMatched);
        if (passwordMatched) {
            next();
        } else {
            res.send("Incorrect password!");
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(err.message);
    })
}, respondWithToken);

router.post('/logout', (req, res) => {
    console.log("Logging out!");
    res.cookie('jwt', null, {
        maxAge: 0,
        //secure: true,
        httpOnly: true,
    });
    res.json(null);
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

router.post('/register', registrationValidator, (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const user = req.body.user;
    const password = req.body.password;

    db.query('SELECT * FROM registration WHERE registrationID = ?', [user])
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
            [firstName, lastName, email, user, passwordHash]);
    })
    .then(([results, fields]) => {
        if (results && results.affectedRows === 1) {
            console.log(results);
            console.log("Created account!");
            next();
        } else {
            console.log("Account creation failed!");
            res.send("Account creation failed!");
        }
    })
    .catch((err) => {
        console.log(err);
        res.send(err.message);
    });
}, respondWithToken);

module.exports = router;