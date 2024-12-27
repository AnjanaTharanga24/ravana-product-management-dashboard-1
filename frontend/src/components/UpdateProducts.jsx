import React, { useState, useEffect } from "react";
import phoneImg from '../assets/images/phone.png'
import laptopImg from '../assets/images/laptop.png'
import tabletImg from '../assets/images/tablet.png'

import axios from "axios";

function UpdateProducts({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (product.quantity >= 10) {
      alert("only add 10 items");
    } else {
      setFormData(prev => ({
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
      setFormData(prev => ({
        ...prev,
        quantity: Number(prev.quantity) - 1
      }));
    }
  };

  const getImage = (category) =>{
       if(category === "Mobile Phone"){
         return phoneImg
       }else if(category === "Laptop"){
         return laptopImg
       }else if(category === "Tablet"){
         return tabletImg
       }
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/product/${product._id}`, formData);
      alert("Product updated successfully!");
      onUpdate(); 
      onClose();
    } catch (error) {
      console.error("Error updating product:", error.message);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div>

        <div className="d-flex justify-content-center">
            <img src={getImage(formData.category)} height="200px" width="200px" />
        </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="ms-1">Name</label>
          <input
            type="text"
            className="form-control mt-2 mb-3"
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="ms-1">Category</label>
          <select
            className="form-select mt-2 mb-3"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile Phone">Mobile Phone</option>
            <option value="Tablet">Tablet</option>
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
            <span className="mx-2">{formData.quantity}</span>
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={handleDecrement}
            >
              -
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="button" className="btn btn-danger" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProducts;
