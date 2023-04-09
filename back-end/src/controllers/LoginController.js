const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class LoginController {
    HandleLogin = async (req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;
        
        try { //viết theo async/await
            let user = await userModel.findOne({
                name: username
            })

            if(!user) return res.json({ err: "Tài khoảng, mật khẩu không hợp lệ"});
            //check password
            let checkPassword = bcrypt.compareSync(password, user.password);
            if(!checkPassword) return res.status(400).json({err: "Mật khẩu không đúng"});

            const loginToke = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET)
            res.cookie("jwtToken", loginToke, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            return res.send({ message: "Success"});

            next;

        } catch (err) {
            console.log(err);
            res.status(500).send({error: err})
        }

        
    }

}

module.exports = new LoginController;