const express = require("express");
const Product = require("../models/ProductModel");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  searchProducts,
  searchByCategory,
} = require("../controllers/ProductController");
const router = express.Router();

router.route("/create").post(createProduct);
router.route("/").get(getAllProducts);
router.route("/:id").delete(deleteProduct);
router.route("/:id").put(updateProduct);
router.route("/search").get(searchProducts);
router.route("/search/category").get(searchByCategory);

module.exports = router;
