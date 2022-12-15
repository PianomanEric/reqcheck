const express = require('express');
const router = express.Router();
const db = require('../../config/database');

router.get('/', (req, res) => {
  // This doesn't work right now. Backend courses table is being rebuilt.

    /*
    db.execute('SELECT * FROM courses', (err, result, fields) => {
      if (err) {
        console.log(err.stack)
        return;
      }
      console.log(result);
      res.json(result);
    });
    */
   res.json([]);
})

module.exports = router;