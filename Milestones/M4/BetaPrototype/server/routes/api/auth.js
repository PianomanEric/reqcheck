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

const INACTIVITY_TIMEOUT = 5 * MINUTES;

const CS_DEGREE_PLAN = {
    'General Education': {
        'Courses': [],
        'Requirements': ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C1|C2', 'D1|D2|D3', 'E', 'UDB', 'UDC', 'UDD'],
    },
    'Math and Physics': {
        'Courses': ['MATH226', 'MATH227', 'MATH324', 'MATH325', 'PHYS220', 'PHYS222', 'PHYS230', 'PHYS232'],
        'Requirements': [],
    },
    'Computer Science': {
        'Courses': ['CSC210', 'CSC211', 'CSC220', 'CSC230', 'CSC256', 'CSC300GW', 'CSC317', 'CSC340', 'CSC413', 'CSC415', 'CSC510', 'CSC600', 'CSC648'],
        'Requirements': ['CSCE', 'CSCE', 'CSCE', 'CSCE'],
    },
}

const applyDegreePlan = (user, plan) => {
    const insertData = [];
    const additionalRequirement = ' (?, ?, ?, ?, ?),';
    let insertStatement = 'INSERT INTO requirement (userID, codeID, category, exact, `group`) VALUES';
    for (const [generalArea, generalAreaData] of Object.entries(plan)) {
        for (const course of generalAreaData.Courses) {
            insertData.push(user);
            insertData.push(course);
            insertData.push(course);
            insertData.push(true);
            insertData.push(generalArea);
            insertStatement += additionalRequirement;
            db.query('INSERT INTO enrollment (enrollmentID, courseID, semester, year, inprogress, completed, grade) VALUES (?, ?, ?, ?, ?, ?, ?)', [user, course, 'Spring', 2022, false, true, 'A']).then(([results, fields]) => {
                console.log(results);
            });
        }
        for (const requirement of generalAreaData.Requirements) {
            insertData.push(user);
            insertData.push(null);
            insertData.push(requirement);
            insertData.push(false);
            insertData.push(generalArea);
            insertStatement += additionalRequirement;
        }
    }
    if (insertData.length === 0) {
        return;
    }
    insertStatement = insertStatement.slice(0, -1) + ';';
    db.query(insertStatement, insertData).then(([results, fields]) => {
        console.log(results);
    });
    db.query('SELECT * FROM requirement').then(([results, fields]) => {
        console.log('After');
        console.log(results);
    });
    /*
    db.query('SELECT * FROM enrollment').then(([results, fields]) => {
        console.log('After');
        console.log(results);
    });
    */
    return;
}

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
        //secure: true, // Can only be used over HTTPS
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
        //secure: true, // Can only be used over HTTPS
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
            applyDegreePlan(user, CS_DEGREE_PLAN);
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