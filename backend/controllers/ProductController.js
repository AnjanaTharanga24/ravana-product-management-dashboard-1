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

const deleteProduct = async (req,res) =>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        res.status(200).send(`product deleted successfully`)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

const updateProduct = async (req,res) =>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

const searchProducts = async (req,res)=>{
    try {
        const {query} = req.query;

        const products = await Product.find({
            name:{$regex:query,$options:"i"}
        })
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({msg: error.message});
    }
}
module.exports = {createProduct,getAllProducts,deleteProduct,updateProduct,searchProducts}