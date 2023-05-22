const Categories = require("../models/Categories");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

class CategoriesController {
  GetAllCategory = (req, res, next) => {
    const query = Categories.find({});
    query
      .then((cate) => res.json(cate))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  };

  AddCategory = async (req, res, next) => {
    try {
      // get fileName
      const files = req.file.filename;
      const fileUrl = path.join(files);
      const newCate = req.body;

      const query = await Categories.find({ name: newCate.name });

      if (query.length > 0) {
        fs.unlink(`src/asset/uploads/${fileUrl}`, (err) => {
          if (err) {
            // console.log(err);
            return next(new ErrorHandler("Error deleting file!", 500));
          }
        });

        return next(new ErrorHandler("Cate đã tồn tại", 400));
      }

      newCate.image_Url = fileUrl;
      const saveCate = new Categories(newCate);
      saveCate
        .save()
        .then((cate) => res.status(201).json(cate))
        .catch((error) => next(new ErrorHandler(error.message, 500)));
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };

  UpdateCategory = (req, res, next) => {
    const idCate = req.params("id");
    const fileName = req.file.fileName;
    const fileUrl = path.join(fileName);
    fs.unlink(`src/asset/uploads/${fileUrl}`, (err) => {
      if (err) {
        return next(new ErrorHandler("Error deleting file!", 500));
      }
    });
    const newCate = req.body;
    newCate.image_Url = fileUrl;

    Categories.findByIdAndUpdate(idCate, newCate, { new: true })
      .then((data) => res.status(200).json(data))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  };

  DeleteCategory = (req, res, next) => {
    const idCate = req.params("id");
    Categories.findByIdAndDelete(idCate)
      .then((data) => res.status(200).json(data))
      .catch((error) => next(new ErrorHandler(error.message, 500)));
  };
}

module.exports = new CategoriesController();
