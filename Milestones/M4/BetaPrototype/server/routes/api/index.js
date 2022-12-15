const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/courses', require('./courses'));
router.use('/equivalencies', require('./equivalencies'));

module.exports = router;