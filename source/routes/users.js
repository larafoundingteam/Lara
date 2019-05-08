const express = require('express');

const router = express.Router();

/* GET users listing. */
router.post('/', (req, res, next) => {
  if (req.body.username === undefined) {
    res.statusMessage = 'Username must be specified';
    res.status(400).end();
  }
  if (req.body.username.toLowerCase().trim() === 'admin') {
    res.send('Authorized');
  } else {
    res.statusMessage =
      'Unauthorized you are not the user we are looking for... Try another username';
    res.status(400).end();
  }
});

module.exports = router;
