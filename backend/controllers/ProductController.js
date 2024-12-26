const Product = require('../models/ProductModel')

const createProduct = async (req,res) =>{
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).send({msg:error})
  }
}

const getAllProducts = async (req,res) =>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
} 

module.exports = {createProduct,getAllProducts}