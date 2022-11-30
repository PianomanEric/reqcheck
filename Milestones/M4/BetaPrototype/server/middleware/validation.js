const registrationValidator = (req, res, next) => {
    console.log(req.body);
    const username = JSON.stringify(req.body.username);
    console.log(username);
    console.log('Valid!');
    next();
}

module.exports = {registrationValidator}