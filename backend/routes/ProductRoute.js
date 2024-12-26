const express = require('express')
const Product = require('../models/ProductModel');
const { createProduct } = require('../controllers/ProductController');
const router = express.Router();

router.route("/create").post(createProduct)

module.exports = router;

