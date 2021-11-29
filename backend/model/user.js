const mongoose = require("mongoose");

//creating User schema
const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  favourite: { type : Array , "default" : [] },
});

module.exports = mongoose.model("user", userSchema);