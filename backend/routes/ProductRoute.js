const express = require('express')
const Product = require('../models/ProductModel');
const { createProduct, getAllProducts, deleteProduct } = require('../controllers/ProductController');
const router = express.Router();

router.route("/create").post(createProduct)
router.route("/").get(getAllProducts)
router.route("/:id").delete(deleteProduct)


module.exports = router;

