const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    console.log("requiring auth");
    req.user = null;
    console.log(req.headers);
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401);
                res.send();
            } else {
                req.user = decoded.user;
                console.log(req.user);
                next();
            }
        });
    } else {
        console.log("No token")
        res.status(401);
        res.send();
    }
}

module.exports = { requireAuth }