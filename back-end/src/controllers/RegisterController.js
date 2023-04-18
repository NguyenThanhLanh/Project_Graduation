const User = require("../models/User");
const bcrypts = require("bcryptjs");

class RegisterController {
  AddNewUser = (req, res) => {
    // console.log(req);
    const salt = bcrypts.genSaltSync(10);
    console.log(req.body);
    if (!req.body.name) {
      res.status(404).send({ message: "Content can not be empty!" });
      return;
    }
    const userRequest = req.body;
    const hashPassword = bcrypts.hashSync(req.body.password, salt);
    userRequest.password = hashPassword;
    const newUser = User(userRequest);
    newUser
      .save()
      .then((user) => res.status(201).json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  };
}

module.exports = new RegisterController();
