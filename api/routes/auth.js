//User modeli ile ilişki routes tarafında kurulur ve http metodları oluşturulur (CRUD)
//ardından server tarafında bu route çağırılır
const User = require("../models/User.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//POST:veriyi oluşturup dbye gönderme -register
router.post("/register", async (req, res) => {
  try {
    //bcrypt ile şifreleme
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json("A new user created successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST:veriyi oluşturup dbye gönderme -login
router.post("/login", async (req, res) => {
  try {
    //findOne ile email varsa user var demektir
    const user = await User.findOne({ email: req.body.email });
    //eğer user yoksa
    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      //şifre doğru değilse
      res.status(403).json("Invalid password!");
    } else {
      //şifre doğruysa
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
