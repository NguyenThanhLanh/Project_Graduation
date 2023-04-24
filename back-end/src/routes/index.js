const jwt = require("jsonwebtoken");
const product = require("./productRouter");
const user = require("./userRouter");
const suppiler = require("./suppilerRouter");
const role = require("./roleRouter");
const login = require("./loginRouter");
const register = require("./registerRouter");
const logout = require("../helper/Logout");
const activationAccount = require("./activationRouter");
const catchAsyncErrors = require("../middleware/catchAsyncError");

function router(app) {
  app.get("/logout", catchAsyncErrors(logout));
  app.use("/search", (req, res) => {
    res.send("Trang tìm kiếm");
  });
  app.use("/register", register);
  app.use("/user", user);
  app.use("/product", product);
  app.use("/suppiler", suppiler);
  app.use("/role", role);
  app.use("/login", login);
  app.use("/activation", activationAccount);

  app.use("/", (req, res) => {
    res.send("Trang chủ");
  });
}

module.exports = router;
