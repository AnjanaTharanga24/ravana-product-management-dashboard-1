import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "../css/dasboard.css";

function ProductForm({ onClose }) {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: 0,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) {
      newErrors.name = "Product name is required.";
    }
    if (!product.category) {
      newErrors.category = "Please select a category.";
    }
    if (product.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5001/api/product/create",
        product
      );
      console.log(response.data);
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Add product successfully",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'custom-swal-size'
        }
      });
      
      setTimeout(()=>{
        onClose();
      },2000)
      
      setTimeout(()=>{
        window.location.reload();
      },2001)

  
    } catch (error) {
      console.log({ msg: error.message });
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (product.quantity >= 10) {
      Swal.fire({
              title: "Error!",
              text: "cannot add more than 10",
              icon: "error"
            });
    } else {
      setProduct((prev) => ({
        ...prev,
        quantity: Number(prev.quantity) + 1,
      }));
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (product.quantity <= 1) {
      Swal.fire({
        title: "Error!",
        text: "cannot add less than 1",
        icon: "error"
      });
    } else {
      setProduct((prev) => ({
        ...prev,
        quantity: Number(prev.quantity) - 1,
      }));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="ms-1">Name</label>
          <input
            type="text"
            className={`form-control mt-2 mb-3 ${
              errors.name ? "is-invalid" : product.name ? "is-valid" : ""
            }`}
            placeholder="Enter product name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="ms-1">Category</label>
          <select
            className={`form-select mt-2 mb-3 ${
              errors.category ? "is-invalid" : product.category ? "is-valid" : ""
            }`}
            name="category"
            value={product.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile Phone">Mobile Phone</option>
            <option value="Tablet">Tablet</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
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
            <span
              className={`mx-2 ${
                errors.quantity ? "text-danger" : "text-success"
              }`}
            >
              {product.quantity}
            </span>
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={handleDecrement}
            >
              -
            </button>
          </div>
          {errors.quantity && (
            <div className="text-danger">{errors.quantity}</div>
          )}
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

export default ProductForm;
