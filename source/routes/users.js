const express = require('express');

const router = express.Router();

function isAuthorizedUser(user) {
  if (user.toLowerCase().trim() === 'admin') {
    return true;
  }
  return false;
}

/* GET users listing. */
router.post('/', (req, res, next) => {
  if (req.body.username === undefined) {
    res.statusMessage = 'Username must be specified';
    res.status(400).end();
  }
  if (isAuthorizedUser(req.body.username)) {
    res.send('Authorized');
  } else {
    res.statusMessage =
      'Unauthorized you are not the user we are looking for... Try another username';
    res.status(400).end();
  }
});

module.exports = router;
