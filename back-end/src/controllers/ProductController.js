const Product = require('../models/Product');

class ProductController {
    GetAllProducts(req, res){
        const query = Product.find({});
        query.then(products => res.json(products))
            .catch(err => res.status(500).send(err));
    }

    GetProductById(req, res){
        const idPrd = req.param('id');
        const query = Product.findOne({_id: idPrd});
        query.then(product => res.json(product))
            .catch(err => res.status(404).send('Not found'))
    }

    AddNewProduct(req, res){
        const newProduct = new Product(req.body);
        newProduct.save().then(product => res.status(201).json(product))
            .catch(err => res.status(500).send(err));
    }

    UpdateProduct(req, res){
        const idPrd = req.param('id');
        Product.findByIdAndUpdate(idPrd, req.body, { new: true })
            .then(product => res.json(product))
            .catch(err => res.status(500).send(err));
    }

    DeleteProduct(req, res){
        const idPrd = req.param('id');
        Product.findByIdAndRemove(idPrd)
        .then(product => res.json(product))
        .catch(err => res.status(500).send(err));
    }

}

module.exports = new ProductController;