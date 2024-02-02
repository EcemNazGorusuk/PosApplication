//Product modeli ile ilişki routes tarafında kurulur ve http metodları oluşturulur (CRUD)
//ardından server tarafında bu route çağırılır
const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

//POST:veriyi oluşturup dbye gönderme
router.post("/add-product", async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(200).json("Item added successfully.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  


//GET:veri dbden getirme
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});


//PUT:veriyi güncellemek ve güncel halini dbye gönderme
router.put("/update-product", async (req, res) => {
  try {
    //not:postman tarafında da güncelleme yaparken _id değil productId kullan
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});


//DELETE:veriyi silme işlemi
router.delete("/delete-product", async (req, res) => {
  try {
    //not:postman tarafında da silme işlemi yaparken _id değil productId kullan
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;