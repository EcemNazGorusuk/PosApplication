//Bill modeli ile ilişki routes tarafında kurulur ve http metodları oluşturulur (CRUD)
//ardından server tarafında bu route çağırılır
const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

//POST:veriyi oluşturup dbye gönderme
router.post("/add-bill", async (req, res) => {
    try {
      const newBill = new Bill(req.body);
      await newBill.save();
      res.status(200).json("Item added successfully.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  


//GET:veri dbden getirme
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
});




module.exports = router;