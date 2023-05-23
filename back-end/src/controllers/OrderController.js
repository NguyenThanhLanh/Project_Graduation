const Order = require("../models/Order");
const ErrorHandler = require("../utils/ErrorHandler");

class OrderController {
  GetAllOrder(req, res, next) {
    const query = Order.find({});
    query
      .then((data) => res.status(200).json(data))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }

  GetOrderById(req, res, next) {
    const idOrder = req.param("id");
    const query = Order.find({ "user._id": idOrder });
    query
      .then((data) => res.json(data))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }

  AddNewOrder(req, res) {
    const newOrder = new Order(req.body);
    console.log(newOrder);
    newOrder
      .save()
      .then((data) =>
        res.status(201).json({
          status: "success",
          data: data,
        })
      )
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }

  DeleteOrder(req, res) {
    const idOrder = req.param("id");
    Order.findByIdAndRemove(idOrder)
      .then((order) =>
        res.status(201).json({
          status: "success",
          data: order,
        })
      )
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }
}

module.exports = new OrderController();
