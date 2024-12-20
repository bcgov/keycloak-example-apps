require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const { CORS } = require('./cors');
const { authMiddleware } = require('./verify');

app.use(CORS);

app.get('/open', (_, res) => {
  res.send('This is an open endpoint');
});

app.get('/restricted', authMiddleware, (_, res) => {
  res.send('This is restricted content');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
