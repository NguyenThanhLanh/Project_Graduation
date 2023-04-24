const ErrorHandler = require("../utils/ErrorHandler");

const User = require("../models/User");
class UserController {
  GetAllUser = (req, res) => {
    const query = User.find().select("-password").populate("roleId", "name");
    query
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  GetUserById = (req, res) => {
    const idUser = req.param("id");
    const query = User.findById(idUser).populate("roleId");
    query
      .then((user) => res.json(user))
      .catch((err) => res.status(404).send("Not found"));
  };

  //loaduser
  LoadUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return next(new ErrorHandler("User doesn't exists", 400));
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };

  UpdateUser = (req, res) => {
    const idUser = req.param("id");
    const updateUser = req.body;
    User.findByIdAndUpdate(idUser, updateUser, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  DeleteUser = (req, res) => {
    const idUser = req.param("id");
    User.findByIdAndRemove(idUser)
      .then((user) => res.json(user))
      .catch((err) => err.status(500).send(err));
  };
}

module.exports = new UserController();
