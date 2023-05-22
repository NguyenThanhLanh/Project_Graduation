const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

class ProductController {
  GetAllProducts(req, res, next) {
    const query = Product.find({});
    query
      .then((products) => res.json(products))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }

  GetProductById(req, res, next) {
    const idPrd = req.param("id");
    const query = Product.findOne({ _id: idPrd });
    query
      .then((product) => res.json(product))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }

  AddNewProduct = async (req, res, next) => {
    try {
      const files = req.files;
      const fileName = files.map((item) => `${item.filename}`);
      const prdData = req.body;

      prdData.image_Url = fileName;
      const product = await Product.create(prdData);

      res.status(201).json({
        success: true,
        product: product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  };

  UpdateProduct(req, res, next) {
    const idPrd = req.param("id");
    Product.findByIdAndUpdate(idPrd, req.body, { new: true })
      .then((product) => res.json(product))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }

  DeleteProduct = async (req, res, next) => {
    try {
      const idPrd = req.param("id");
      const prd = await Product.findById(idPrd);

      prd.image_Url.forEach((item) => {
        const fileName = item;
        const filePath = `src/asset/uploads/${fileName}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const delPrd = await Product.findByIdAndDelete(idPrd);

      if (!delPrd) {
        return next(
          new ErrorHandler(`Not found product with id - ${idPrd}`, 500)
        );
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  };
}

module.exports = new ProductController();
