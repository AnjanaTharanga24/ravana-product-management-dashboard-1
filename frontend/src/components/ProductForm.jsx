import axios from "axios";
import React, { useState } from "react";

function ProductForm({ onClose }) {
    
  const [product,setProduct] = useState({
    name:"",
    category:"",
    quantity:0
  });
   
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) =>{
    try {
        e.preventDefault();
        const response = await axios.post("http://localhost:5001/api/product/create",product)
        console.log(response.data)
    } catch (error) {
        console.log({msg:error.message})
    }
  }


  const handleIncrement = (e) => {
    e.preventDefault();
    if (product.quantity >= 10) {
      alert("only add 10 items");
    } else {
      setProduct(prev => ({
        ...prev,
        quantity: Number(prev.quantity) + 1
      }));
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (product.quantity <= 1) {
      alert("items always must be greater than 0");
    } else {
      setProduct(prev => ({
        ...prev,
        quantity: Number(prev.quantity) - 1
      }));
    }
  };


  return (
    <div>
      <form>
        <div className="form-group">
          <label className="ms-1">Name</label>
          <input
            type="text"
            className="form-control mt-2 mb-3"
            placeholder="Enter product name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="ms-1">Category</label>
          <select className="form-select mt-2 mb-3" name="category" value={product.category} onChange={handleInputChange}>
            <option value={""} selected>Select category</option>
            <option value={"Laptop"}>Laptop</option>
            <option value={"Mobile Phone"}>Mobile Phone</option>
            <option value={"Tablet"}>Tablet</option>
          </select>
        </div>

        <div className="form-group">
          <label className="ms-1">Quantity</label>
          <div className="d-flex align-items-center mt-2 mb-4">
            <button
              type="button"
              className="btn btn-info text-white"
              onClick={handleIncrement}
            >
              +
            </button>
            <span className="mx-2">{product.quantity}</span>
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={handleDecrement}
            >
              -
            </button>
          </div>
        </div>

        <div className="d-flex d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>

          <button type="submit" className="btn btn-danger" onClick={onClose}>
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
