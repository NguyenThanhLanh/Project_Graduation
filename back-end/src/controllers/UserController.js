const User = require('../models/User');

class UserController {
    GetAllUser(req, res){
        const query = User.find({});
        query.then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    }

    GetUserById(req, res){
        const idUser = req.param('id');
        const query = User.findById(idUser);
        query.then(user => res.json(user))
            .catch(err => res.status(404).send('Not found'));
    }

    AddNewUser(req, res){
        const newUser = new User(req.body);
        newUser.save().then(user => res.status(201).json(user))
            .catch(err => res.status(500).send(err));
    }

    UpdateUser(req, res){
        const idUser = req.param('id');
        const updateUser = req.body;
        User.findByIdAndUpdate(idUser, updateUser, {new: true})
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    DeleteUser(req, res){
        const idUser = req.param('id');
        User.findByIdAndRemove(idUser)
        .then(user => res.json(user))
        .catch(err => err.status(500).send(err));
    }
}

module.exports = new UserController;