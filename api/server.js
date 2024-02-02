

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");
const logger=require("morgan")
//*ROUTES
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); //connect to cluster0
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(logger("dev"))

//*USE ROUTE
app.use("/api/categories", categoryRoute);
/*
 gideceği adresler: 
   http://localhost:5000/api/categories/add-category
   http://localhost:5000/api/categories/get-all
   http://localhost:5000/api/categories/update-category
   http://localhost:5000/api/categories/delete-category
*/
app.use("/api/products", productRoute);
/*
 gideceği adresler: 
   http://localhost:5000/api/products/add-product
   http://localhost:5000/api/products/get-all
   http://localhost:5000/api/products/update-product
   http://localhost:5000/api/products/delete-product
*/

app.use("/api/bills", billRoute);
/*
 gideceği adresler: 
   http://localhost:5000/api/bills/add-bill
   http://localhost:5000/api/bills/get-all
 
*/

app.use("/api/auth", authRoute);
/*
 gideceği adresler: 
   http://localhost:5000/api/auth/register
   http://localhost:5000/api/auth/login
 */

app.use("/api/users", userRoute);
/*
 gideceği adresler: 
  http://localhost:5000/api/users/get-all-users
  http://localhost:5000/api/users/get-user
 */

app.get("/", (req, res) => res.send("Hello World!")); //5000 portuna request send etmek
app.listen(port, () => {
  connect();
  console.log(`Example app listening on port: ${port}`);
});
