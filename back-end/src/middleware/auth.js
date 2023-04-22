const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const token = authHeader && authHeader.split(' ')[1];
  const loginToken = req.cookies.jwtToken;
  if (!loginToken)
    return res.status(401).json({ message: "You're not authenticated!" });

  // return res.send(loginToken);
  const tokeDecoded = jwt.verify(
    loginToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid" });
      }
      console.log(user);
      req.user = user;
      next();
    }
  );
  console.log("verifyToken");
};

module.exports = verifyToken;
