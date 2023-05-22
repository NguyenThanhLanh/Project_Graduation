const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const fs = require("fs");

const User = require("../models/User");
class UserController {
  GetAllUser = (req, res, next) => {
    const query = User.find().select("-password").populate("roleId", "name");
    query
      .then((users) => res.json(users))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  };

  GetUserById = (req, res, next) => {
    const idUser = req.param("id");
    const query = User.findById(idUser).populate("roleId");
    query
      .then((user) => res.json(user))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  };

  //loaduser
  LoadUser = async (req, res, next) => {
    try {
      // console.log("user trong loaduser: ", req.user);
      const user = await User.findById(req.user.id).populate("roleId");
      if (!user) return next(new ErrorHandler("User doesn't exists", 400));
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };

  UpdateUser = (req, res, next) => {
    const idUser = req.param("id");
    console.log("update: ", idUser);
    const updateUser = req.body;
    console.log("update: ", updateUser);
    User.findByIdAndUpdate(idUser, updateUser, { new: true })
      .then((user) => res.json(user))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  };

  UpdateImageUser = async (req, res, next) => {
    try {
      //Xóa ảnh cũ
      console.log(req.user);
      const existsUser = await User.findById(req.user);
      const existAvatarPath = `src/asset/uploads/${existsUser.avatar}`;
      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };

  DeleteUser = (req, res, next) => {
    const idUser = req.param("id");
    User.findByIdAndRemove(idUser)
      .then((user) => res.json(user))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  };
}

module.exports = new UserController();
