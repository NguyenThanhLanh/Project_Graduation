const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  avatar: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  refreshToken: { type: String, default: null },
  roleId: { type: ObjectId, ref: "Role" },
});

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("User", UserSchema);
