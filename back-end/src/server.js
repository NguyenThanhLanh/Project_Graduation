require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index"); // route main
const db = require("./config/db/mongoosedb"); //connect database
const myModel = require("./models/MyModel");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middleware/handleError");

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
    origin: ["http://localhost:3000", "http://localhost:3002"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "asset/uploads")));
console.log(path.join(__dirname, "asset"));

router(app); //Route Init

app.use(ErrorHandler); //handleError

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
