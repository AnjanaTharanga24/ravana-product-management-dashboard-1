const Product = require('../models/ProductModel')

const createProduct = async (req,res) =>{
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).send({msg:error})
  }
}

module.exports = {createProduct}