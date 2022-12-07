const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.get('cookie');
    const token = res.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Valid token!");
                console.log(decoded);
            }
        });
    } else {
        console.log("No auth header")
    }
    next();
}

module.exports = { checkToken }