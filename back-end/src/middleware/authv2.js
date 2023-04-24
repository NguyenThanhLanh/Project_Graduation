const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  console.log("cookie token: ", token);

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

// exports.isSeller = catchAsyncErrors(async (req, res, next) => {
//   const { seller_token } = req.cookies;
//   if (!seller_token) {
//     return next(new ErrorHandler("Please login to continue", 401));
//   }

//   const decoded = jwt.verify(seller_token, process.env.ACCESS_TOKEN_SECRET);

//   req.seller = await Shop.findById(decoded.id);

//   next();
// });
