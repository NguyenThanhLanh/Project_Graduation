const userModel = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/saveJwTTokenCookie");
const bcrypt = require("bcryptjs");

class LoginController {
  HandleLogin = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
      return next(new ErrorHandler("Nhập thiếu trường thông tin", 400));

    try {
      //viết theo async/await
      let user = await userModel
        .findOne({
          name: username,
        })
        .populate("roleId");

      if (!user)
        return next(new ErrorHandler("Không tìm thấy tài khoảng", 400));

      //check password
      // let checkPassword = await user.comparePassword(password);
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword)
        return next(new ErrorHandler("Nhập sai mật khẩu!", 400));

      sendToken(user, 201, res);
    } catch (err) {
      console.log(err);
      next(new ErrorHandler(err.message, 400));
    }
  };
}

module.exports = new LoginController();
