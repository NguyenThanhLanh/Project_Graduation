const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class LoginController {
  HandleLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
      //viết theo async/await
      let user = await userModel
        .findOne({
          name: username,
        })
        .populate("roleId");

      if (!user) return res.json({ err: "Tài khoảng, mật khẩu không hợp lệ" });

      //check password
      let checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword)
        return res.status(400).json({ err: "Mật khẩu không đúng" });

      //update refeshToken trong database
      const loginToken = this.generateAccessToken(user);
      res.cookie("jwtToken", loginToken, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.send({ message: "Success" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err });
    }
  };

  generateAccessToken = (payLoad) => {
    const loginToken = jwt.sign({ payLoad }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    // const refeshToken = jwt.sign({ payLoad }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h'}); // create refeshToken

    // return { loginToken, refeshToken };
    return loginToken;
  };
}

module.exports = new LoginController();
