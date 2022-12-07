const userFormat = /^\d{9}$/;
const emailFormat = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const nameFormat = /^[a-zA-Z '-]+$/;

const loginValidator = (req, res, next) => {
    const user = req.body.user;
    const password = req.body.password;

    if (
        userFormat.test(user)
        && typeof(password) === 'string'
    ) {
        console.log("Validated!");
        next();
    } else {
        res.send("One or more fields are invalid");
    }
}

const registrationValidator = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const user = req.body.user;
    const password = req.body.password;

    if (
        nameFormat.test(firstName)
        && nameFormat.test(lastName)
        && emailFormat.test(email)
        && userFormat.test(user)
        && passwordFormat.test(password)
    ) {
        console.log("Validated!");
        next();
    } else {
        res.send("One or more fields must be corrected");
    }
}

module.exports = {loginValidator, registrationValidator}