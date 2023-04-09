const User = require('../models/User');
const bcrypts = require('bcryptjs');

class RegisterController {
    AddNewUser = (req, res) => {
        const salt =  bcrypts.genSaltSync(10);
        const userRequest = req.body;
        const hashPassword = bcrypts.hashSync(req.body.password, salt);
        userRequest.password = hashPassword;
        const newUser = User(userRequest);
        newUser.save().then(user => res.status(201).json(user))
        .catch(err => res.status(500).json(err));
    }

}

module.exports = new RegisterController;