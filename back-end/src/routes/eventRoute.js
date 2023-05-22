const express = require("express");
const router = express.Router();
const { upload } = require("../../multer");
const { isAuthenticated, isAdmin } = require("../middleware/authv2");

const EventController = require("../controllers/EventController");

router.delete("/:id", isAuthenticated, isAdmin, EventController.DeleteEvent);
router.put("/:id", isAuthenticated, isAdmin, EventController.UpdateEvent);
router.get("/:id", EventController.GetEventById);
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.single("image_Url"),
  EventController.AddNewEvent
);
router.get("/", EventController.GetAllEvent);

module.exports = router;
