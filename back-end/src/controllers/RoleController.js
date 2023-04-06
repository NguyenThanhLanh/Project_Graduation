const Role = require('../models/Role');

class RoleController {
    GetAllRole(req, res){
        const query = Role.find({});
        query.then(roles => res.json(roles))
            .catch(err => res.status(500).send(err));
    }

    GetRoleById(req, res){
        const idRole = req.param('id');
        const query = Role.findById(idRole);
        query.then(role => res.json(role))
            .catch(err => res.status(404).send('Not found'));
    }

    AddNewRole(req, res){
        const newRole = new Role(req.body);
        newRole.save().then(role => res.status(201).json(role))
            .catch(err => res.status(500).send(err));
    }

    UpdateRole(req, res){
        const idRole = req.param('id');
        const updateUseRole = req.body;
        Role.findByIdAndUpdate(idRole, updateUseRole, {new: true})
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    DeleteRole(req, res){
        const idRole = req.param('id');
        Role.findByIdAndRemove(idRole)
        .then(role => res.json(role))
        .catch(err => err.status(500).send(err));
    }
}

module.exports = new RoleController;