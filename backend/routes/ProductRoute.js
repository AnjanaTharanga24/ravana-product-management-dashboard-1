const express = require('express')
const Product = require('../models/ProductModel');
const { createProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/ProductController');
const router = express.Router();

router.route("/create").post(createProduct)
router.route("/").get(getAllProducts)
router.route("/:id").delete(deleteProduct)
router.route("/:id").put(updateProduct)


module.exports = router;

