
'use-strict';

const express = require('express');
const Logger = require('./Logger');

const app = express();
const logger = new Logger();
const messageRouter = express.Router();
const port = process.env.PORT || 3000;

messageRouter.route('/message')
  .get((req, res) => {
    const response = { message: 'This is a sample message', user: 'Jebediah' };
    res.json(response);
  });
app.use('/api', messageRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Private Messaging API!');
});

app.listen(port, () => {
  logger.log(`Running on port ${port}`);
});
