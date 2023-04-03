const Product = require('../models/Product');

class ProductController {
    getAllProducts(req, res){
        const query = Product.find({});
        query.then(products => res.json(products))
            .catch(err => console.log(err));
    }

    getProductByID(req, res){
        const idPrd = req.params.test;
        res.send(idPrd)
    }

}

module.exports = new ProductController;