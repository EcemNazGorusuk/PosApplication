const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    //username,email,password,timestamps
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);//mongoDb'deki tablo adı:users
module.exports = User;