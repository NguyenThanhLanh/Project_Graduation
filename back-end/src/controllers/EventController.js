const Event = require("../models/Event");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const path = require("path");
class EventController {
  GetAllEvent(req, res, next) {
    const query = Event.find({});
    query
      .then((Event) => res.status(200).json(Event))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }

  GetEventById(req, res, next) {
    const idPrd = req.param("id");
    const query = Event.findOne({ _id: idPrd });
    query
      .then((event) => res.status(201).json(event))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  }

  AddNewEvent = async (req, res, next) => {
    try {
      const fileName = req.file.filename;
      const fileUrl = path.join(fileName);
      const EventData = req.body;

      EventData.image_Url = fileUrl;
      const newEvent = await Event.create(EventData);

      res.status(201).json({
        success: true,
        event: newEvent,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  };

  UpdateEvent(req, res, next) {
    const idPrd = req.param("id");
    debugger;
    Event.findByIdAndUpdate(idPrd, req.body, { new: true })
      .then((product) => res.json(product))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
    debugger;
  }

  DeleteEvent = async (req, res, next) => {
    try {
      const idPrd = req.param("id");
      const event = await Event.findById(idPrd);

      const fileName = event.image_Url;
      const filePath = `src/asset/uploads/${fileName}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });

      const delEvent = await Event.findByIdAndDelete(idPrd);

      if (!delEvent) {
        return next(
          new ErrorHandler(`Not found product with id - ${idPrd}`, 500)
        );
      }

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  };
}

module.exports = new EventController();
