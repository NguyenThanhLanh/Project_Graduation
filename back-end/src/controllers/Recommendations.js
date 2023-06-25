const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");

class Recommendations {
  calculateProductSimilarity = async () => {
    const allProducts = await Product.find({});
    const productIds = allProducts.map((product) => product._id);
    const productSimilarity = {};
    for (let i = 0; i < productIds.length; i++) {
      const productA = allProducts.find(
        (product) => product._id === productIds[i]
      );
      productSimilarity[productIds[i]] = {};

      for (let j = 0; j < productIds.length; j++) {
        if (i !== j) {
          const productB = allProducts.find(
            (product) => product._id === productIds[j]
          );
          const commonUsers = await Order.find({
            products: { $all: [productA._id, productB._id] },
          }).distinct("userId");

          const similarity =
            commonUsers.length /
            Math.sqrt(productA.users.length * productB.users.length);

          productSimilarity[productIds[i]][productIds[j]] = similarity;
        }
      }
    }
  };
  async recommendProducts(req, res, next) {
    const idUser = req.param("id");
    // get danh sách sản phẩm đã mua
    const orderIds = await Order.find({ "user._id": idUser });
    const purchasedProducts = await Order.find({ _id: { $in: orderIds } });
    const products = purchasedProducts.reduce(
      (acc, order) => [...acc, ...order.cart],
      []
    );

    // Tính toán độ tương đồng

    // console.log("Danh sach san pham: ", products);
  }
}

module.exports = new Recommendations();
