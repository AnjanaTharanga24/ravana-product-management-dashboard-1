const express = require('express')
const Product = require('../models/ProductModel');
const { createProduct, getAllProducts } = require('../controllers/ProductController');
const router = express.Router();

router.route("/create").post(createProduct)
router.route("/").get(getAllProducts)


module.exports = router;

