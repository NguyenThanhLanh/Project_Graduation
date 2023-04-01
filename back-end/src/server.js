const express = require('express');
const morgan = require('morgan');
const router = require("./routes/index"); // import route main
const bodyParser = require('body-parser');
const Book = require('./models/Role');
const db = require("./config/db/mongoosedb"); //connect database

const app = express();
const port = 3000;

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
app.use(httpReq)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


