//Users modeli ile ilişki routes tarafında kurulur ve get users yapılır (CRUD)
//ardından server tarafında bu route çağırılır
const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

//GET: tüm userları dbden getirme
router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

//GET: tek user'ı dbden getirme
router.get("/get-user", async (req, res) => {
  //not:postman tarafında idye göre user getirirken  _id değil userId kullan
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
