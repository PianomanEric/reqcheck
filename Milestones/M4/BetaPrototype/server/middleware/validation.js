const studentIDFormat = /\d{9}/;
const emailFormat = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const nameFormat = /^[a-zA-Z '-]+$/;

const loginValidator = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (
        emailFormat.test(email)
        && passwordFormat.test(password)
    ) {
        console.log("Validated!");
        next();
    } else {
        
    }
}

const registrationValidator = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const studentID = req.body.studentID;
    const password = req.body.password;

    if (
        nameFormat.test(firstName)
        && nameFormat.test(lastName)
        && emailFormat.test(email)
        && studentIDFormat.test(studentID)
        && passwordFormat.test(password)
    ) {
        console.log("Validated!");
        next();
    } else {
        console.log(firstName, nameFormat.test(firstName));
        console.log(lastName, nameFormat.test(lastName));
        console.log(email, emailFormat.test(email));
        console.log(studentID, studentIDFormat.test(studentID));
        console.log(password, passwordFormat.test(password));
        res.redirect('/home');
    }
}

module.exports = {loginValidator, registrationValidator}