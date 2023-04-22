const User = require("../models/User");
const bcrypts = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const { json } = require("body-parser");
const ErrorHandler = require("../utils/ErrorHandler");

class RegisterController {
  AddNewUser = async (req, res, next) => {
    try {
      const salt = bcrypts.genSaltSync(10);
      // get fileName
      const fileName = req.file.filename;
      console.log("nameAvatar", fileName);
      const fileUrl = path.join(fileName);

      const userRequest = req.body;
      console.log("UserRequest: ", userRequest);
      if (!userRequest) {
        return next(new ErrorHandler("Content can not be empty!", 400));
      }
      const query = await User.find({
        $or: [
          { name: userRequest.name },
          { email: userRequest.email },
          { phone: userRequest.phone },
        ],
      });
      console.log("Kết quả check Emtity: ", query);

      if (query.length > 0) {
        // console.log(`src/asset/uploads/${fileUrl}`);
        fs.unlink(`src/asset/uploads/${fileUrl}`, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
        // return res.status(400).json({
        //   status: "fail",
        //   message: "UserName, Email, Password đã tồn tại",
        // });
        return next(
          new ErrorHandler("UserName, Email, Password đã tồn tại"),
          400
        );
      }

      const hashPassword = bcrypts.hashSync(req.body.password, salt);
      userRequest.password = hashPassword;
      userRequest.avatar = fileUrl;
      JSON.stringify(userRequest);
      console.log(userRequest);

      const activationToken = this.createActivationToken(userRequest);
      const activationURL = `http://localhost:3000/activation/${activationToken}`;

      try {
        await sendMail({
          email: userRequest.email,
          subject: "Activate your account",
          message: `Xin chào ${userRequest.name}, đây là mail kích hoạt tài khoảng. Vui lòng ấn xác nhận tại link ${activationURL} để kích hoạt tài khoảng của bạn.`,
        });
        res.status(201).json({
          status: "success",
          message:
            "Đã gởi mail kích hoạt tài khoảng, vui lòng check mail của ban.",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };

  ActiveEmailUser = async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) return next(new ErrorHandler("Invalid token"), 400);

      User(newUser)
        .save()
        .then((user) =>
          res.status(201).json({
            status: "susscess",
            message: "Đã tạo User thành công",
            user: user,
          })
        )
        .catch((err) => {
          console.log(err);
          // res.status(500).json({
          //   status: "fail",
          //   message: "Lỗi",
          // });
          return next(new ErrorHandler(err.message, 500));
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };

  createActivationToken = (User) => {
    return jwt.sign(User, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };
}

module.exports = new RegisterController();
