const express = require('express')
const router = express.Router()

const{createUser,loginUser} =require('../Controllers/UserController')
const {authentication,authorization} = require('../Middleware/auth')
const{createProduct,getProduct} = require("../Controllers/ProductController")
 const {getRevenueByDate} = require("../Controllers/ProductController")



//User's Api

router.post("/register",createUser)
router.post("/login",loginUser) 

//Product's Api

 router.post("/users/:userId/product",authentication,authorization,createProduct)
 router.get("/users/:userId/topProducts",authentication,authorization,getProduct)
 router.get("/users/:userId/dailyrevenue",authentication,authorization,getRevenueByDate)



//if api is invalid OR wrong URL
router.all("/*", function (req, res) {
    res.status(404).send({ status: false, msg: "The api you requested is not available" });
  });
  
  module.exports = router;