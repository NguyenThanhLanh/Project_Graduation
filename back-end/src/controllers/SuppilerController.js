const Suppiler = require('../models/Suppiler');

class SuppilerController {
    GetAllSuppilers(req, res){
        const query = Suppiler.find({});
        query.then(suppiler => res.json(suppiler))
            .catch(err => res.status(500).send(err));
    }

    GetSuppilerById(req, res){
        const idSuppiler = req.param('id');
        const query = Suppiler.findOne({_id: idSuppiler});
        query.then(suppiler => res.json(suppiler))
            .catch(err => res.status(404).send('Not found'))
    }

    AddNewSuppiler(req, res){
        const newSuppiler = new Suppiler(req.body);
        console.log(newSuppiler);
        newSuppiler.save().then(suppiler => res.status(201).json(suppiler))
            .catch(err => res.status(500).send(err));
    }

    UpdateSuppiler(req, res){
        const idPrd = req.param('id');
        Suppiler.findByIdAndUpdate(idPrd, req.body, { new: true })
            .then(product => res.json(product))
            .catch(err => res.status(500).send(err));
    }

    DeleteSuppiler(req, res){
        const idPrd = req.param('id');
        Suppiler.findByIdAndRemove(idPrd)
        .then(product => res.json(product))
        .catch(err => res.status(500).send(err));
    }

}

module.exports = new SuppilerController;