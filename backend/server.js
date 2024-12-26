const express = require('express');
const dotenv = require("dotenv").config();
const connectDB = require('./config/connectDB');
const ProductRoute = require('./routes/ProductRoute')

const app = express();

app.use(express.json())
app.use("/api/product",ProductRoute)

connectDB();
const PORT = process.env.PORT || 5001

app.listen(PORT , () =>{
    console.log(`Server running on port ${PORT}`)
})