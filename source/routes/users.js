const express = require('express');
const auth = require('../authenticator');

const router = express.Router();

/* Post users listing. */
router.post('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.body.username === undefined) {
    res.statusMessage = 'Username must be specified';
    res.status(400).end();
  } else if (auth.isAuthorizedUser(req.body.username)) {
    res.send({
      status: 'Authorized',
    });
  } else {
    res.statusMessage = 'Unathorized user';
    res.status(403).end();
  }
});

module.exports = router;
