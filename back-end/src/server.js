require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index"); // route main
const db = require("./config/db/mongoosedb"); //connect database
const myModel = require("./models/MyModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const { showError } = require("./middleware/handleError");

const app = express();
const PORT = process.env.PORT || 3000;
const httpReq = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join("");
});

app.use(httpReq);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200", "http://localhost:3000"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router(app); //Route Init
// app.use(showError()); //handleError

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
