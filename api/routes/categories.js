//Category modeli ile ilişki routes tarafında kurulur ve http metodları oluşturulur (CRUD)
//ardından server tarafında bu route çağırılır
const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

//POST:veriyi oluşturup dbye gönderme
router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("item added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});


//GET:veri dbden getirme
router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});


//PUT:veriyi güncellemek ve güncel halini dbye gönderme
router.put("/update-category", async (req, res) => {
  try {
    //not:postman tarafında da güncelleme yaparken _id değil categoryId kullan
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});


//DELETE:veriyi silme işlemi
router.delete("/delete-category", async (req, res) => {
  try {
    //not:postman tarafında da silme işlemi yaparken _id değil categoryId kullan
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
