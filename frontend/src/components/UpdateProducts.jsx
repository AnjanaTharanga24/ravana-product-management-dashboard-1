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
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    } else if (formData.quantity > 10) {
      newErrors.quantity = 'Quantity cannot exceed 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validated) {
      validateForm();
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (formData.quantity >= 10) {
      setErrors({...errors, quantity: 'Maximum quantity is 10'});
    } else {
      setFormData(prev => ({
        ...prev,
        quantity: Number(prev.quantity) + 1
      }));
    }
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (formData.quantity <= 1) {
      setErrors({...errors, quantity: 'Minimum quantity is 1'});
    } else {
      setFormData(prev => ({
        ...prev,
        quantity: Number(prev.quantity) - 1
      }));
    }
  };

  const getImage = (category) => {
    if(category === "Mobile Phone") return phoneImg;
    if(category === "Laptop") return laptopImg;
    if(category === "Tablet") return tabletImg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    
    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`http://localhost:5001/api/product/${product._id}`, formData);
      onUpdate();
      onClose();
    } catch (error) {
      setErrors({...errors, submit: 'Failed to update product. Please try again.'});
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <img src={getImage(formData.category)} height="200px" width="200px" alt={formData.category} />
      </div>
      <form onSubmit={handleSubmit} noValidate className={`needs-validation ${validated ? 'was-validated' : ''}`}>
        <div className="form-group">
          <label className="ms-1">Name</label>
          <input
            type="text"
            className={`form-control mt-2 mb-3 ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength="3"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="ms-1">Category</label>
          <select
            className={`form-select mt-2 mb-3 ${errors.category ? 'is-invalid' : ''}`}
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile Phone">Mobile Phone</option>
            <option value="Tablet">Tablet</option>
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
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
            <span className={`mx-2 ${errors.quantity ? 'text-danger' : ''}`}>
              {formData.quantity}
            </span>
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={handleDecrement}
            >
              -
            </button>
            {errors.quantity && <div className="text-danger ms-2">{errors.quantity}</div>}
          </div>
        </div>

        {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

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