require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const router = require("./routes/index"); // route main
const db = require("./config/db/mongoosedb"); //connect database
const bodyParser = require('body-parser');
const myModel = require('./models/MyModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpReq = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join('')
})

router(app); //Route Init
app.use(httpReq);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})


